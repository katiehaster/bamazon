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
    console.log("connected as id " + connection.threadId);
    viewItems();
});

function viewItems() {
    connection.query("SELECT * FROM products", function(err, result) {
        if (err) throw err;
        console.table(result);
        userInput();
    });
}

function userInput() {
    inquirer.prompt([
    {
        type: "input",
        name: "customerProductId",
        message: "What is the ID of the product you would like to purchase?"
    },
    {
        type: "input",
        name: "customerQtyRequest",
        message: "How many would you like?"
    }

    // 

        .then(function (customerOrderCheck) {
        connection.query("SELECT * FROM products", function(err, result) {
            if (err) throw err;
            console.log("Error: " + "customerOrderCheck")
            if (customerOrderCheck.customerProductID <= result.stock_quantity) {
            update();
            } else console.log("Insufficient order!") {
                // run update blocker
            }
        })
            })
    ]);
}

function update(); {
    connection.query(
        "SELECT * FROM
    )
}

