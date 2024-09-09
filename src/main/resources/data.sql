-- Insert data into the Product table
INSERT INTO product (productId, productName, price) VALUES
(1, 'Smartphone', 599.99),
(2, 'Laptop', 1299.99),
(3, 'Gaming Console', 399.99);

-- Insert data into the Review table
INSERT INTO review (reviewId, reviewContent, rating, productId) VALUES
(1, 'Great battery life!', 5, 1),
(2, 'Lags sometimes.', 3, 1),
(3, 'Perfect for my daily tasks!', 4, 2),
(4, 'Bit pricey, but worth it.', 4, 2),
(5, 'Awesome gaming experience!', 5, 3),
(6, 'Needs more exclusive games.', 4, 3);
