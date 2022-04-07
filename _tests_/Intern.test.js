const Intern = require('../lib/Intern');

test('Generates a school for the Intern via getSchool()', () => {
  const testSchool = 'UT';
  const intern = new Intern('John', '06', 'password', testSchool);
  expect(intern.school).toBe(testSchool);
});

test('Confirms getRole() returns intern', () => {
  const testRole = 'Intern';
  const intern = new Intern('John', '06', 'password', 'us');
  expect(intern.getRole()).toBe(testRole);
});
