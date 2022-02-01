INSERT INTO department (id, name)
VALUES  (1, "Command"),
        (2, "Science"),
        (3, "Engineering"),
        (4, "Security"),
        (5, "Medical");

INSERT INTO role (id, title, salary, department_id)
VALUES  (1, "Captain", 0.00, 1),
        (2, "First Officer", 0.00, 1),
        (3, "Head Engineer", 0.00, 3),
        (4, "Doctor", 0.00, 5),
        (5, "Transporter Operator", 0.00, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Jean-luc", "Picard", 2,  NULL),
       (2, "William", "Riker", 3, 1),
       (3, "Geordie", "LaForge", 4, 1),
       (4, "Beverly", "Crusher", 5, 1),
       (5, "Miles", "Obrien", 1, 3);
       
