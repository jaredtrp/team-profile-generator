const Intern = require('../lib/Intern');

test('Creates a school for the Intern via the getSchool()', () => {
  const testSchool = 'UT';
  const intern = new Intern('John', '01', 'fgjjhlk', testSchool);
  expect(intern.school).toBe(testSchool);
});

test('Makes sure getRole() returns intern', () => {
  const testRole = 'Intern';
  const intern = new Intern('John', '01', 'asrhdslh', 'UT');
  expect(intern.getRole()).toBe(testRole);
});
