const Engineer = require('../lib/Engineer');

test('Creates a github link for the engineer via getGithub()', () => {
  const playHub = 'diirtydog';
  const engineer = new Engineer('John', '01', 'ldfkhgle', playHub);
  expect(engineer.github).toBe(playHub);
});

test('Makes sure getRole() is returning Engineer', () => {
  const testRole = 'Engineer';
  const engineer = new Engineer();
  expect(engineer.getRole()).toBe(testRole);
});
