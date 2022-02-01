INSERT INTO department (id, name)
VALUES  (1, "Command"),
        (2, "Science"),
        (3, "Engineering"),
        (4, "Security"),
        (5, "Medical");

INSERT INTO role (id, name)
VALUES  (1, "Captain"),
        (2, "First Officer"),
        (3, "Head Engineer"),
        (4, "Doctor"),
        (5, "Transporter Operator");

INSERT INTO employee (first_name, last_name, manager_id)
VALUES ("Jean-luc", "Picard" , 1),
       ("William", "Riker", 1),
       ("Geordie", "LaForge", 2),
       ("Beverly", "Crusher", 2),
       ("Miles", "Obrien", 3);
       
