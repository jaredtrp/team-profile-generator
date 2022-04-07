const Engineer = require('../lib/Engineer');

test('Generates a GitHub link for the engineer via getGithub()', () => {
  const playHub = 'jaredtrp';
  const engineer = new Engineer('Jane', '01', 'password', playHub);
  expect(engineer.github).toBe(playHub);
});

test('Confirms getRole() is returning Engineer', () => {
  const testRole = 'Engineer';
  const engineer = new Engineer();
  expect(engineer.getRole()).toBe(testRole);
});
