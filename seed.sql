USE employee_db;
-- seeding department table--

INSERT INTO Department (name)
VALUES ("IT Department");

INSERT INTO Department (name)
VALUES ("Treasury Department");

INSERT INTO Department (name)
VALUES ("HR Department");

INSERT INTO Department (name)
VALUES ("Maintainance Department");

INSERT INTO Department (name)
VALUES ("Compliance Department");
-- seeding into employee table--
INSERT INTO Employee (first_name,last_name,role_id)
VALUES ("Edward", "Apostal", "1");
INSERT INTO Employee (first_name,last_name,role_id)
VALUES ("Vishal", "Patel", "1");
INSERT INTO Employee (first_name,last_name,role_id)
VALUES ("Ryan", "Udugampula", "1");
INSERT INTO Employee (first_name,last_name,role_id)
VALUES ("Sean", "Gillespie", "1");

INSERT INTO Employee (first_name,last_name,role_id)
VALUES ("Anas", "Qazi", "2");
INSERT INTO Employee (first_name,last_name,role_id)
VALUES ("David", "Gehtman", "2");
INSERT INTO Employee (first_name,last_name,role_id)
VALUES ("Dmytro", "Latysh", "2");


INSERT INTO Employee (first_name,last_name,role_id)
VALUES ("Cristina", "LSM", "3");

-------------------------------------
INSERT INTO Employee (first_name,last_name,role_id)
VALUES ("John", "Doe", "4");
INSERT INTO Employee (first_name,last_name,role_id)
VALUES ("Rosalva", "Love", "5");


INSERT INTO Employee (first_name,last_name,role_id)
VALUES ("Shaniqua", "Welcher", "6");
INSERT INTO Employee (first_name,last_name,role_id)
VALUES ("Pearle", "Kerbs", "6");
INSERT INTO Employee (first_name,last_name,role_id, manager_id)
VALUES ("Pearline", "Deras", "7","1");
INSERT INTO Employee (first_name,last_name,role_id, manager_id)
VALUES ("Roger", "Lagarde", "8","3");
INSERT INTO Employee (first_name,last_name,role_id, manager_id)
VALUES ("Gerda", "Ver", "8","1");
INSERT INTO Employee (first_name,last_name,role_id, manager_id)
VALUES ("Lynda", "Boggs", "5","4");
INSERT INTO Employee (first_name,last_name,role_id, manager_id)
VALUES ("Merideth", "Delao", "2","1");

INSERT INTO Employee (first_name,last_name,role_id,manager_id)
VALUES ("Kimbra", "Delao", "3","1");
-- seeding into Role table
INSERT INTO Role(title, salary, department_id)
VALUES ("IT HEAD","100000","1");
INSERT INTO Role(title, salary, department_id)
VALUES ("Developer","50000","1");

INSERT INTO Role(title, salary, department_id)
VALUES ("Treasury Head","80000","2");

INSERT INTO Role(title, salary, department_id)
VALUES ("HR Head","120000","3");
INSERT INTO Role(title, salary, department_id)
VALUES ("HR Assistant","40000","3");

INSERT INTO Role(title, salary, department_id)
VALUES ("Helper","25000","4");
INSERT INTO Role(title, salary, department_id)
VALUES ("Cleaner","25000","4");

INSERT INTO Role(title, salary, department_id)
VALUES ("Complaince Head","30000","5");
SELECT * FROM Employee;


