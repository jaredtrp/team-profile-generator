const Manager = require('../lib/Manager');

test('Creates a office number using the getofficefunction()', () => {
  const testNumber = '09876543';
  const manager = new Manager('Jim', '2433', 'email', testNumber);
  expect(manager.officeNumber).toBe(testNumber);
});

test('Makes sure getRole() is returning Manager', () => {
  const newRole = 'Manager';
  const manager = new Manager();
  expect(manager.getRole()).toBe(newRole);
});
