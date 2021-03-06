CREATE DATABASE IF NOT EXISTS database_links;

USE database_links;

-- users table
CREATE TABLE IF NOT EXISTS users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL ,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users ADD PRIMARY KEY (id);

ALTER TABLE users MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

DESCRIBE users;

-- Links table
CREATE TABLE IF NOT EXISTS links(
    id INT(11) NOT NULL,
    user_id INT(11) NOT NULL,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY user_id REFERENCES users(id)
);

ALTER TABLE links ADD PRIMARY KEY (id);

ALTER TABLE links MODIFY id INT(11) NOT NULL AUTO_INCREMENT;