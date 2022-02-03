INSERT INTO department(department_name)
VALUES("Engineering"),
      ("Finance"),
      ("Legal"),
      ("Sales");

INSERT INTO role(title, salary, department_id)
VALUES("Sales Lead", 100.0, 4),
      ("Salesperson", 80.0, 4),
      ("Lead Engineer", 150.0, 1),
      ("Software Engineer", 120.0, 1),
      ("Account Manager", 160.0, 2),
      ("Accountant", 125.0, 2),
      ("Legal Team Lead", 250.0, 3),
      ("Lawyer", 190.0, 3);

INSERT INTO employee(first_name, last_name, role_id)
VALUES("Olivia", "Thomas", 1),
      ("Elizabeth", "Faun", 2),
      ("Bob", "Ross", 3),
      ("Oliver", "Smith", 4),
      ("Sebastian", "Mellow", 5),
      ("Christian", "Romero", 6),
      ("Brian", "William", 7),
      ("Rachel", "Herm", 8);