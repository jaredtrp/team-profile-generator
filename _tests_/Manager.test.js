const Manager = require('../lib/Manager');

test('Generates an officenumber using getofficefunction()', () => {
  const testNumber = '09876543';
  const manager = new Manager('Josh', 'password', 'josh@gmail.com', testNumber);
  expect(manager.officeNumber).toBe(testNumber);
});

test('Makes sure getRole() is returning Manager', () => {
  const newRole = 'Manager';
  const manager = new Manager();
  expect(manager.getRole()).toBe(newRole);
});
