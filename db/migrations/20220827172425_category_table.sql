-- migrate:up
CREATE TABLE categories (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    parent_id INT NOT NULL,
    category_name VARCHAR(100) NOT NULL
);

-- migrate:down
DROP TABLE categories;
