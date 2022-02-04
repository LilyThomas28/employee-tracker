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
    const sql = "SELECT * FROM roles";
    db.query(sql, function(err, results) {
        if (err) throw err;
        console.table(results);
    });
    starter();
}

// -- updateEmpRole()


// -- addRole()


// -- viewAllDpts()
function viewAllDpts() {
    const sql = "SELECT * FROM departments";
    db.query(sql, function(err, results) {
        if (err) throw err;
        console.table(results);
    });
    starter();
}


// -- addDpt()


// -- viewAllEmps()


// -- addEmp()


        // {
        //     type: 'input',
        //     name: 'Add Department',
        //     message: 'What is the name of the department?',
        // },
        // {
        //     type: 'input',
        //     name: 'Add Role',
        //     message: 'What is the name of the role?',
        // },
        // {
        //     type: 'number',
        //     name: 'Role Salary',
        //     message: 'What is the salary of the role?',
        // },
        // {
        //     type: 'list',
        //     name: 'Added Role Dpt',
        //     message: 'Which department does the role belong to?',
        //     choices: [],
        // },
        // {
        //     type: 'input',
        //     name: 'Employees First Name',
        //     message: 'What is the employees first name?',
        // },
        // {
        //     type: 'input',
        //     name: 'Employees Last Name',
        //     message: 'What is the employees last name?',
        // },
        // {
        //     type: 'list',
        //     name: 'Employees Role',
        //     message: 'What is the employees role?',
        //     choices: [],
        // },
        // {
        //     type: 'list',
        //     name: 'Employees Manager',
        //     message: 'Who is the employees manager?',
        //     choices: [],
        //     ],
        // },
        // {
        //     type: 'list',
        //     name: 'Update Employee Role',
        //     message: 'Which employees role do you want to update?',
        //     choices: [],
        // },
        // {
        //     type: 'list',
        //     name: 'Employees New Role',
        //     message: 'Which role do you want to assign the selected employee?',
        //     choices: [],
        // },
starter();
    