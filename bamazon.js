let mysql = require("mysql");
let inquirer = require("inquirer");

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Whattaburger369!",
  database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    viewItems();
});

function viewItems() {
    connection.query("SELECT * FROM products", function(err, result) {
        if (err) throw err;
        console.table(result);
       
        var arr = [];
        for (let i = 0; i < arr.length; i++) {
         console.log(arr);
        }
        inquirer.prompt([
            {
                type: "list",
                name: "customerProductChoice",
                message: "What would like to purchase?",
                choices: function() {
                    var choiceArray = [];
                    for (var i = 0; i < result.length; i++) {
                      choiceArray.push(result[i].product_name);
                    }
                    return choiceArray;
                  },
            },
            {
                type: "input",
                name: "requestedQuantity",
                message: "How many would you like?"
            }
        ])

        .then(function (answer) {
            var requestedQuantity = answer.requestedQuantity;
            // check how much stock there is for the chosen item
            connection.query("SELECT * FROM products WHERE item_id=?", function (err, result) {
                if (err) throw err;
                var actualQuantity = result[0].stock_quantity;
                var price = result[0].price;

                //determines if there is enough in stock to meet the customers desired quantity
                if (requestedQuantity <= actualQuantity) {

                    //if have enough stock, update the available stock quantity and tell customer their total and that their order is fulfilled
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

                // not enough stock, sorry customer message
                else {
                    console.log("Sorry we don't have enough in stock to fulfill your order.");
                }
                connection.end();
            }
            );
        }
        )
}
)
}


   
        // .then(function (customerOrderCheck) {
        //     var
        // connection.query("SELECT * FROM products WHERE ?",{
            
        // } function(err, result) {
        //     if (err) throw err;
        //     console.log("Error: " + "customerOrderCheck")
        //     if (customerOrderCheck.customerQtyRequest <= result.stock_quantity) {
        //     update();
        //     } else console.log("Insufficient order!") 
        //         // run update blocker
            
        // })
        //     });
   
// function update(); {
//     connection.query(
//         "SELECT * FROM
//     )
// }

