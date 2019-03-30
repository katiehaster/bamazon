DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;
CREATE TABLE products
(
    item_id INTEGER(10) AUTO_INCREMENT,
    product_name VARCHAR (30) NOT NULL,
    department_name VARCHAR,
    price INTEGER,
    stock_quantity INTEGER,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("throw pillow", "home", 25, 10), ("chew toy", "pets", 7, 50),
("Sprint", "books", 29, 15), ("brocolli", "groceries", 5, 17), ("foundation", "beauty", 39, 20), ("pacifier", "baby", 8, 100), ("black v-neck", "clothing", 12, 200), ("tablet", "electronics", 99, 50), ("aloe vera plant", "garden", 15, 5), ("rocking horse", "toys", 49, 15), ("Heroes of the Storm", "electronics", 19, 250);



