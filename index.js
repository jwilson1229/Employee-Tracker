import inquirer from 'inquirer';
import { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } from './queries.js';
import { table } from 'table';


const mainMenu = async () => {
    const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ]
    });

    switch (action) {
        case 'View all departments':
            try {
                const departments = await viewDepartments();
                if (departments.length === 0) {
                    console.log('No departments found.');
                } else {

                    const tableData = [
                        ['ID', 'Department Name'],
                        ...departments.map(dep => [dep.id, dep.dep_name])
                    ];
                    console.log(table(tableData));
                }
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
            break;
        case 'View all roles':
            try {
                const roles = await viewRoles();
                if (roles.length === 0) {
                    console.log('No roles found.');
                } else {
                    const tableData = [
                        ['ID', 'Title', 'Department', 'Salary'],
                        ...roles.map(role => [role.id, role.title, role.dep_name, role.salary])
                    ]
                    console.log(table(tableData));
                }
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
            break;

        case 'View all employees':
            try {
                const employees = await viewEmployees();
                if (employees.length === 0) {
                    console.log('No employees found.');
                } else {
                    const tableData = [
                        ['ID', 'First Name', 'Last Name', 'Role', 'Department', 'Salary', 'Manager'],
                        ...employees.map(emp => [emp.id, emp.first_name, emp.last_name, emp.title, emp.dep_name, emp.salary, emp.manager])
                    ];
                    console.log(table(tableData));
                }
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
            break;
        case 'Add a department':
            const { depName } = await inquirer.prompt({
                type: 'input',
                name: 'depName',
                message: 'Enter department name:'
            });
            await addDepartment(depName);
            console.log('Department added!');
            break;
        case 'Add a role':
            const { roleTitle, roleSalary, roleDepartment } = await inquirer.prompt([
                { type: 'input', name: 'roleTitle', message: 'Enter role title:' },
                { type: 'input', name: 'roleSalary', message: 'Enter role salary:' },
                { type: 'input', name: 'roleDepartment', message: 'Enter department ID for the role:' }
            ]);
            await addRole(roleTitle, roleSalary, roleDepartment);
            console.log('Role added!');
            break;
        case 'Add an employee':
            const { empFirstName, empLastName, empRole, empManager } = await inquirer.prompt([
                { type: 'input', name: 'empFirstName', message: 'Enter employee first name:' },
                { type: 'input', name: 'empLastName', message: 'Enter employee last name:' },
                { type: 'input', name: 'empRole', message: 'Enter role ID for the employee:' },
                { type: 'input', name: 'empManager', message: 'Enter manager ID (or leave blank):' }
            ]);
            await addEmployee(empFirstName, empLastName, empRole, empManager || null);
            console.log('Employee added!');
            break;
        case 'Update an employee role':
            const { empId, newRoleId } = await inquirer.prompt([
                { type: 'input', name: 'empId', message: 'Enter employee ID:' },
                { type: 'input', name: 'newRoleId', message: 'Enter new role ID:' }
            ]);
            await updateEmployeeRole(empId, newRoleId);
            console.log('Employee role updated!');
            break;
        case 'Exit':
            process.exit();
            break;
    }

    mainMenu();
};

mainMenu();

