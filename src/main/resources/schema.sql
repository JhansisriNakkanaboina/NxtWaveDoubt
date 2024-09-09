DROP TABLE IF EXISTS review;
DROP TABLE IF EXISTS product;

CREATE TABLE product (
    productId INTEGER PRIMARY KEY AUTO_INCREMENT,
    productName TEXT NOT NULL,
    price DOUBLE NOT NULL
);

CREATE TABLE review (
    reviewId INTEGER PRIMARY KEY AUTO_INCREMENT,
    reviewContent TEXT NOT NULL,
    rating INTEGER NOT NULL,
    productId INTEGER,
    FOREIGN KEY (productId) REFERENCES product(productId)
);
