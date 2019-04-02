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
VALUES ("Throw Pillow", "Home", 25, 10), ("Chew Toy", "Pets", 7, 50),
("Sprint", "Books", 29, 15), ("Brocolli", "Groceries", 5, 17), ("Foundation", "Beauty", 39, 20), ("Pacifier", "Baby", 8, 100), ("Black V-neck", "Clothing", 12, 200), ("Tablet", "Electronics", 99, 50), ("Aloe Vera Plant", "Garden", 15, 5), ("Rocking Horse", "Toys", 49, 15), ("Heroes of the Storm", "Electronics", 19, 250);



