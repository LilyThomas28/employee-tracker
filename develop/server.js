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
    db.query(
        "SELECT employees.id, first_name, last_name, title, salary, department_name FROM departments JOIN roles ON departments.id = roles.department_id JOIN employees ON employees.role_id = roles.id;",
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
    db.query("SELECT first_name, last_name, title FROM departments JOIN roles ON departments.id = roles.department_id JOIN employees ON employees.role_id = roles.id;"), 
    async (err, allEmployees, allRoles) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            const { empChosen } = await inquirer.prompt([{
                type: 'list',
                name: 'Update Employee Role',
                message: 'Which employees role do you want to update?',
                choices: allEmployees.map((employees) => ({
                    name: `${employees.first_name} ${employees.last_name}`,
                    value: employees.id,
                }))
            },
            {
                type: 'list',
                name: 'Employees New Role',
                message: 'Which role do you want to assign the selected employee?',
                choices: allRoles.map((roles) => ({
                    name: `${roles.role_name}`,
                    value: roles.role_id,
                }))
            },
            ]);
            const sql = "UPDATE employee SET role_id = ? WHERE employees.id = ?;";
            db.query(sql, [empChosen[0], empChosen[1]], (err, results) => {
                if (err)
                    throw err;
                console.table(results);
            });
            starter();
        }
}

// -- addRole()
function addRole() {
    db.query("SELECT first_name, last_name, title FROM departments JOIN roles ON departments.id = roles.department_id JOIN employees ON employees.role_id = roles.id;"), 
    async (err, allDpts) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            const { addedRole } = await inquirer.prompt([{
                    type: 'input',
                    name: 'Add Role',
                    message: 'What is the name of the role?',
                },
                {
                    type: 'number',
                    name: 'Role Salary',
                    message: 'What is the salary of the role?',
                },
                {
                    type: 'list',
                    name: 'Added Role Dpt',
                    message: 'Which department does the role belong to?',
                    choices: allDpts.map((departments) => ({
                        name: `${departments.department_name}`,
                        value: departments.id,
                    }))
                },
            ]);
            const sql = "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);";
            db.query(sql, [addedRole[0], addedRole[1], addedRole[2]], (err, results) => {
                if (err)
                    throw err;
                console.table(results);
            });
            starter();
        }
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
    db.query("SELECT first_name, last_name, title FROM departments JOIN roles ON departments.id = roles.department_id JOIN employees ON employees.role_id = roles.id;"), 
    async (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            const newDpt = await inquirer.prompt([{
                type: 'input',
                name: 'Add Department',
                message: 'What is the name of the department?',
            },
            ]);
            const sql = "INSERT INTO departments (department_name) VALUES (?)";
            db.query(sql, newDpt, (err, results) => {
                if (err)
                    throw err;
                console.table(results);
            });
            starter();
        }
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
    db.query("SELECT first_name, last_name, title FROM departments JOIN roles ON departments.id = roles.department_id JOIN employees ON employees.role_id = roles.id;"), 
    async (err, allManagers, allRoles) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            const { empInfo } = await inquirer.prompt([{
                type: 'input',
                name: 'Employees First Name',
                message: 'What is the employees first name?',
            },
            {
                type: 'input',
                name: 'Employees Last Name',
                message: 'What is the employees last name?',
            },
            {
                type: 'list',
                name: 'Employees Role',
                message: 'What is the employees role?',
                choices: allRoles.map((roles) => ({
                    name: `${roles.role_name}`,
                    value: roles.role_id,
                }))
            },
            {
                type: 'list',
                name: 'Employees Manager',
                message: 'Who is the employees manager?',
                choices: allManagers.map((employees) => ({
                    name: `${employees.manager_id}`,
                    value: employees.manager_id,
                }))
            },
            ]);
            const sql = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
            db.query(sql, [empInfo[0], empInfo[1], empInfo[2], empInfo[3]], (err, results) => {
                if (err)
                    throw err;
                console.table(results);
            });
            starter();
        }
}

starter();
