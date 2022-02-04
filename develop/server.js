const mysql = require("mysql2");
const inquirer = require("inquirer");
const sequelize = require('./config/connection');

sequelize.query(
    ";",
    async function (err, ) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        // prompt the user to choose an order
        const {  } = await inquirer.prompt([
            {
                type: 'list',
                name: 'Main question',
                message: 'What would you like to do?',
                choices: [],
            },
        ])
    });
    
    // {
    //   type: "list",
    //   name: "orderId",
    //   message: "Pick an order to edit",
    //   // create array of choices from the order data
    //   choices: allOrders.map((o) => ({
    //     name: `${o.order_id} | ${o.first_name} ${o.last_name} | ${o.order_details}`,
    //     value: o.order_id,
    //   })),
    // },
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
    