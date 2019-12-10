CREATE DATABASE employee_db;
USE employee_db;
CREATE TABLE Employee(
id INT(10) AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT (10) NOT NULL,
manager_id INT(10),
CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES Role(id),
CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES Role(id)
);


CREATE TABLE Role(
id INT(10) AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT(10) NOT NULL,
CONSTRAINT department_id FOREIGN KEY (department_id) REFERENCES Department(id)
);

CREATE TABLE Department(
id INT(10) AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30)
);






