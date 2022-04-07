const Employee = require('../lib/Employee');

test('Generates an employee object', () => {
  const employee = new Employee('Jane', 'password', 'jane.doe@gmail.com');
  const employeeId = employee.id;
  const eMail = employee.email;

  expect(employee.name).toBe('Jane');
  expect(employee.id).toBe(employeeId);
  expect(employee.email).toBe(eMail);
});

test('Generates a name for the employee via getName()', () => {
  const testName = 'Jane';
  const employee = new Employee(testName);
  expect(employee.name).toBe(testName);
});

test('Generates an id for the employee', () => {
  const testValue = 01;
  const employee = new Employee('Jane', testValue);
  expect(employee.id).toBe(testValue);
});

test('Generates an email for the employee via getEmail()', () => {
  const testEmail = 'jane.doe@gmail.com';
  const employee = new Employee('Jane', 'id', testEmail);
  expect(employee.email).toBe(testEmail);
});

test('Confirms getRole() returns Employee', () => {
  const testRole = 'Employee';
  const employee = new Employee();
  expect(employee.getRole()).toBe(testRole);
});
