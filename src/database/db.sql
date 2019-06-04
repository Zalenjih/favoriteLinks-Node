CREATE DATABASE database_links;

USE database_links;

CREATE TABLE users(
    id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(16) NOT NULL UNIQUE,
    email VARCHAR(35) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    fullname VARCHAR(60) NOT NULL,
    role ENUM('USER_ROLE', 'ADMIN_ROLE') NOT NULL DEFAULT 'USER_ROLE'
)ENGINE=InnoDB;

/* ALTER TABLE users ADD PRIMARY KEY (id);
ALTER TABLE users MODIFY id INT(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE users ADD UNIQUE INDEX unique_username (username);
ALTER TABLE users ADD UNIQUE INDEX unique_email (email); */

-- DESCRIBE users;

CREATE TABLE links(
    id INT (11) NOT NULL,
    userId INT (11) NOT NULL,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES users(id)
)ENGINE=InnoDB;


ALTER TABLE links ADD PRIMARY KEY (id);
ALTER TABLE links MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

-- DESCRIBE links;


CREATE TABLE mutex(
    i int NOT NULL PRIMARY KEY
)ENGINE=InnoDB;

INSERT INTO mutex(i) values (1);