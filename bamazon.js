let mysql = require("mysql");
let inquirer = require("inquirer");


let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Whattaburger369!",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    viewItems();
});

//View available products, gather customer input
function viewItems() {
    connection.query("SELECT * FROM products", function (err, result) {
        if (err) throw err;
        console.table(result);

        //goes through all result options and creates a name value pair for the customer's product selection
        var products = result.map(function (item) {
            return { name: item.product_name, value: item.item_id };
        })

        //questions user:
        inquirer
            .prompt([
                {
                    type: "list",
                    message: "What do you want to buy?",
                    choices: products,
                    name: "userChoice",

                }
            ])
            .then(function (productResponse) {
                if (err) throw err;
                var product_id = productResponse.userChoice;

                console.log(result[product_id - 1].product_name);

                //prompts user to find out how many units of the product they would like to buy
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "How many would you like?",
                            name: "requestedQuantity"
                        }
                    ])
                    //function that checks the available quantity against the requested quantity and responds accordingly
                    .then(function (answer) {
                        var requestedQuantity = answer.requestedQuantity;
                        // check how much stock there is for the chosen item
                        connection.query("SELECT * FROM products WHERE item_id=?", product_id, function (err, result) {
                            if (err) throw err;
                            var actualQuantity = result[0].stock_quantity;
                            var price = result[0].price;

                            //determines if there is enough in stock to meet the customers desired quantity
                            if (requestedQuantity <= actualQuantity) {

                                //if there is enough of the item, let the customer know and update the stock_quantity
                                var newQuantity = actualQuantity - requestedQuantity;
                                var totalPrice = requestedQuantity * price;
                                connection.query("UPDATE products SET ? WHERE ?",
                                    [
                                        {
                                            stock_quantity: newQuantity
                                        },
                                        {
                                            item_id: product_id
                                        }
                                    ],
                                    console.log("Your order has been placed! Your total is $" + totalPrice + "."));
                            }
                            // not enough stock, let them know
                            else {
                                console.log("Sorry we don't have enough in stock to fulfill your order.");
                            }
                            // Ends the conversation with MySQL
                            connection.end();
                        }
                        );
                    }
                    )
            }
            )
    })
}
