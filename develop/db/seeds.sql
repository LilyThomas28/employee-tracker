USE employee_db;

INSERT INTO departments(department_name)
VALUES("Engineering"),
      ("Finance"),
      ("Legal"),
      ("Sales");

INSERT INTO roles(title, salary, department_id)
VALUES("Sales Lead", 100.0, 4),
      ("Salesperson", 80.0, 4),
      ("Lead Engineer", 150.0, 1),
      ("Software Engineer", 120.0, 1),
      ("Account Manager", 160.0, 2),
      ("Accountant", 125.0, 2),
      ("Legal Team Lead", 250.0, 3),
      ("Lawyer", 190.0, 3);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES("Olivia", "Thomas", 1, null),
      ("Elizabeth", "Faun", 2, 1),
      ("Bob", "Ross", 3, 2),
      ("Oliver", "Smith", 4, 3),
      ("Sebastian", "Mellow", 5, 4),
      ("Christian", "Romero", 6, 5),
      ("Brian", "William", 7, 5),
      ("Rachel", "Herm", 8, 7);