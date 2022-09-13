-- migrate:up
CREATE TABLE user_product (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    product_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products (id)
);

-- migrate:down
DROP TABLE user_product;