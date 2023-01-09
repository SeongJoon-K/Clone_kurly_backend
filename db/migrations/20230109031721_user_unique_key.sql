-- migrate:up
ALTER TABLE users ADD UNIQUE KEY (login_id);

-- migrate:down

