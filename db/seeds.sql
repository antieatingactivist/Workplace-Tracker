INSERT INTO department (id, name)
VALUES  (1, "Command"),
        (2, "Science"),
        (3, "Engineering"),
        (4, "Security"),
        (5, "Medical");

INSERT INTO role (id, title, salary, department_id)
VALUES  (1, "Captain", 1.00, 1),
        (2, "First Officer", 1.00, 1),
        (3, "Head Engineer", 1.00, 3),
        (4, "Doctor", 1.00, 5),
        (5, "Transporter Operator", 1.00, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Jean-luc", "Picard", 1,  NULL),
       (2, "William", "Riker", 2, 1),
       (3, "Geordie", "LaForge", 3, 2),
       (4, "Beverly", "Crusher", 4, 2),
       (5, "Miles", "Obrien", 5, 3);
    
