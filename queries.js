import client from './dbClient.js'; 

export const viewDepartments = async () => {
    try {
        const res = await client.query('SELECT * FROM department');
        console.log('Departments:', res.rows); 
        return res.rows;
    } catch (err) {
        console.error('Error fetching departments:', err);
        return [];
    }
};


export const viewRoles = async () => {
    try {
        const res = await client.query(
            `SELECT role.id, role.title, department.dep_name, role.salary
            FROM role
            JOIN department ON role.department_id = department.id`
        );
        console.log('Roles:', res.rows); 
        return res.rows;
    } catch (err) {
        console.error('Error fetching roles:', err);
        return [];
    }
};


export const viewEmployees = async () => {
    try {
        const res = await client.query(
            `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.dep_name, role.salary, manager.first_name AS manager
            FROM employee
            JOIN role ON employee.role_id = role.id
            JOIN department ON role.department_id = department.id
            LEFT JOIN employee AS manager ON employee.manager_id = manager.id`
        );
        console.log('Employees:', res.rows); 
        return res.rows;
    } catch (err) {
        console.error('Error fetching employees:', err);
        return [];
    }
};


export const addDepartment = async (name) => {
    try {
        const res = await client.query('INSERT INTO department (dep_name) VALUES ($1) RETURNING *', [name]);
        console.log('Added department:', res.rows[0]); 
        return res.rows[0];
    } catch (err) {
        console.error('Error adding department:', err);
        return null;
    }
};


export const addRole = async (title, salary, departmentId) => {
    try {
        const res = await client.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *', [title, salary, departmentId]);
        console.log('Added role:', res.rows[0]); 
        return res.rows[0];
    } catch (err) {
        console.error('Error adding role:', err);
        return null;
    }
};


export const addEmployee = async (firstName, lastName, roleId, managerId) => {
    try {
        const res = await client.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *', [firstName, lastName, roleId, managerId]);
        console.log('Added employee:', res.rows[0]); 
        return res.rows[0];
    } catch (err) {
        console.error('Error adding employee:', err);
        return null;
    }
};


export const updateEmployeeRole = async (employeeId, newRoleId) => {
    try {
        const res = await client.query('UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *', [newRoleId, employeeId]);
        console.log('Updated employee role:', res.rows[0]); 
        return res.rows[0];
    } catch (err) {
        console.error('Error updating employee role:', err);
        return null;
    }
};
