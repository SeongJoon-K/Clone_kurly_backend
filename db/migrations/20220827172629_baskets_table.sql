-- migrate:up
CREATE TABLE baskets (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    amount INT NOT NULL
);

-- migrate:down
DROP TABLE baskets;
