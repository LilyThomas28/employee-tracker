const inquire = require("inquirer");
const fs = require("fs");

inquirer
    .prompt ([
        {
            type: 'list',
            name: 'Main question',
            message: 'What would you like to do?',
            choices: ['View All Employees', 
                'Update Employee Role', 
                'View All Roles', 
                'Add Role', 
                'View All Departments', 
                'Add Department'],
        },
        {
            type: 'input',
            name: 'Add Department',
            message: 'What is the name of the department?',
        },
        {
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
            choices: ['Engineering', 'Finance', 'Legal', 'Sales'],
        },
        {
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
            choices: ['Sales Lead', 
                'Salesperson', 
                'Lead Engineer', 
                'Software Engineer', 
                'Account Manager', 
                'Accountant', 
                'Legal Team Lead', 
                'Lawyer'],
        },
        {
            type: 'list',
            name: 'Employees Manager',
            message: 'Who is the employees manager?',
            choices: [//ADD MANAGERS??
            ],
        },
        {
            type: 'list',
            name: 'Update Employee Role',
            message: 'Which employees role do you want to update?',
            choices: ['Olivia Thomas',
            'Elizabeth Faun',
            'Bob Ross',
            'Oliver Smith',
            'Sebastian Mellow',
            'Christian Romero',
            'Brian William',
            'Rachel Herm'],
        },
        {
            type: 'list',
            name: 'Employees New Role',
            message: 'Which role do you want to assign the selected employee?',
            choices: ['Engineering', 'Finance', 'Legal', 'Sales'],
        },
    ])