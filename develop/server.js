const mysql = require("mysql2");
const inquirer = require("inquirer");

// create db connection
const db = mysql.createConnection({
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "PinkSkeleton28!",
    database: "employee_db",
  });

// main menu prompt with switch case
function starter () {
    db.query("SELECT employees.id, first_name, last_name, title, salary, department_name FROM departments JOIN roles ON departments.id = roles.department_id JOIN employees ON employees.role_id = roles.id;",
        async function mainMenu (err) {
            if (err) {
                console.error(err);
                process.exit(1);
            };
            const menuOptions = await inquirer.prompt([{
                type: "list",
                message: "What would you like to do?",
                name: "mainMenu",
                choices: [
                    "View All Roles",
                    "Update Employee Role",
                    "Add Role",
                    "View All Departments",
                    "Add Department",
                    "View All Employees",
                    "Add Employee",
                    "QUIT"
                ],
            }]);
            switch (menuOptions.mainMenu) {
                case "View All Roles":
                    viewAllRoles();
                    break;
                case "Update Employee Role":
                    updateEmpRole();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "View All Departments":
                    viewAllDpts();
                    break;
                case "Add Department":
                    addDpt();
                    break;
                case "View All Employees":
                    viewAllEmps();
                    break;
                case "Add Employee":
                    addEmp();
                    break;
                case "QUIT":
                    db.end();
                default:
                    db.end();
            };
        }
    );
};

// -- viewAllRoles()
function viewAllRoles() {
    const sql = "SELECT * FROM roles;";
    db.query(sql, function(err, results) {
        if (err) throw err;
        console.table(results);
    });
    starter();
}

// -- updateEmpRole()
function updateEmpRole() {
    db.query("SELECT first_name, last_name, title FROM departments JOIN roles ON departments.id = roles.department_id JOIN employees ON employees.role_id = roles.id;", async function () {
        db.query("select * from employees;", async function (err, allEmployees) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            const { empChosen } = await inquirer.prompt([{
                type: 'list',
                name: 'empChosen',
                message: 'Which employees role do you want to update?',
                choices: allEmployees.map((employees) => ({
                    name: `${employees.first_name} ${employees.last_name}`,
                    value: employees.id,
                }))
            },
            ]);
            db.query("select * from roles;", async function (err, allRoles) {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
                const { empNewRole } = await inquirer.prompt([{
                    type: 'list',
                    name: 'empNewRole',
                    message: 'Which role do you want to assign the selected employee?',
                    choices: allRoles.map((roles) => ({
                        name: `${roles.title}`,
                        value: roles.id,
                    }))
                },
                ]);
                const sql = "UPDATE employees SET roles_id = ? WHERE employees.id = ?;";
                db.query(sql, [empNewRole, empChosen], (err) => {
                    if (err)
                        throw err;
                    viewAllEmps();
                });
                starter();
            });
        });
    })
}


// -- addRole()
function addRole() {
    db.query("select * from departments;", 
        async function (err, allDpts) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            const { roleName } = await inquirer.prompt([{
                    type: 'input',
                    name: 'roleName',
                    message: 'What is the name of the role?',
                },
            ]);
            const { roleSal } = await inquirer.prompt([{
                    type: 'number',
                    name: 'roleSal',
                    message: 'What is the salary of the role?',
                },
            ]);
            const { roleDpt } = await inquirer.prompt([{
                    type: 'list',
                    name: 'roleDpt',
                    message: 'Which department does the role belong to?',
                    choices: allDpts.map((departments) => ({
                        name: `${departments.department_name}`,
                        value: departments.id,
                    }))
                },
            ]);
            const sql = "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);";
            db.query(sql, [roleName, roleSal, roleDpt], (err) => {
                if (err)
                    throw err;
                viewAllRoles();
            });
            starter();
    })
}

// -- viewAllDpts()
function viewAllDpts() {
    const sql = "SELECT * FROM departments;";
    db.query(sql, function(err, results) {
        if (err) throw err;
        console.table(results);
    });
    starter();
}

// -- addDpt()
function addDpt() {
    db.query("SELECT employees.id, first_name, last_name, title, salary, department_name FROM departments JOIN roles ON departments.id = roles.department_id JOIN employees ON employees.role_id = roles.id;",
        async function department (err) {
            if (err) {
                console.error(err);
                process.exit(1);
            };
            const { dpt_name } = await inquirer.prompt([{
                type: 'input',
                name: 'addDepartment',
                message: 'What is the name of the department?',
            }]);   
            const sql = `INSERT INTO departments (department_name) VALUES (?);`;
            db.query(sql, [dpt_name], function (err) {
                if (err) {
                  console.error(err);
                  process.exit(1);
                }
                console.log("Added new department successfully");
                viewAllDpts();
            });
            starter();
        }
    );
}



// -- viewAllEmps()
function viewAllEmps() {

    const sql = "SELECT * FROM employees;";
    db.query(sql, function(err, results) {
        if (err) throw err;
        console.table(results);
    });
    starter();
}

// -- addEmp()
function addEmp() {
    db.query("SELECT first_name, last_name, title FROM departments JOIN roles ON departments.id = roles.department_id JOIN employees ON employees.role_id = roles.id;", async (err, allManagers, allRoles) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        const { empFirstName } = await inquirer.prompt([{
            type: 'input',
            name: 'empFirstName',
            message: 'What is the employees first name?',
        },
        ]);
        const { empLastName } = await inquirer.prompt([{
                type: 'input',
                name: 'empLastName',
                message: 'What is the employees last name?',
            },
        ]);
        db.query("select * from roles;", async function (err, allRoles) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            const { empRole } = await inquirer.prompt([{
                type: 'list',
                name: 'empRole',
                message: 'What is the employees role?',
                choices: allRoles.map((roles) => ({
                    name: `${roles.role_name}`,
                    value: roles.role_id,
                }))
            },
            ]);
            db.query("select * from employees;", async function (err, allManagers) {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
                const { empMan } = await inquirer.prompt([{
                    type: 'list',
                    name: 'empMan',
                    message: 'Who is the employees manager?',
                    choices: allManagers.map((employees) => ({
                        name: `${employees.manager_id}`,
                        value: employees.manager_id,
                    }))
                },
                ]);
                const sql = "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
                db.query(sql, [empFirstName, empLastName, empRole, empMan], (err) => {
                    if (err)
                        throw err;
                    viewAllEmps();
                });
                starter();
            })
        })
    })
}

starter();
