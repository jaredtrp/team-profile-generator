const fs = require('fs');
const inquirer = require('inquirer');
const fileWriter = require('./src/fileWrite');
const pageGenerator = require('./src/page-template');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

// Prompt the user for the manager data
const promptManager = () => {
  console.log('Welcome to the Team Roster Builder');
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "What is the team manager's name?",
        validate: name => {
          if (name) {
            return true;
          } else {
            console.log(`Please enter a name.`);
            return false;
          }
        },
      },
      {
        type: 'input',
        name: 'id',
        message: "What is the team manager's id number?",
        validate: id => {
          if (id) {
            return true;
          } else {
            console.log(`Please enter an id.`);
            return false;
          }
        },
      },
      {
        type: 'input',
        name: 'email',
        message: "What is the team manager's email address?",
        validate: email => {
          if (email) {
            return true;
          } else {
            console.log('Please enter an email address.');
            return false;
          }
        },
      },
      {
        type: 'input',
        name: 'officeNum',
        message: "What is the team manager's office number?",
        validate: officeNum => {
          if (officeNum) {
            return true;
          } else {
            console.log('Please enter an office number.');
            return false;
          }
        },
      },
    ])
    .then(managerData => {
      // creates the index.html page
      const hero = pageGenerator.generateHero();
      fileWriting.writeFile(hero);

      // creates the manager object with the info given
      const { name, id, email, officeNum } = managerData;
      const manager = new Manager(name, id, email, officeNum);

      // creates the manager card and append it to the html page
      const managerCard = pageGenerator.addManager(manager);
      fileWriting.appendFile(managerCard);
    });
};

const addEmployees = () => {
  console.log('Add a new team member');
  return inquirer
    .prompt([
      {
        type: 'list',
        name: 'role',
        message: 'Which type of team member would you like to add?',
        choices: ['Engineer', 'Intern'],
      },
      {
        type: 'input',
        name: 'name',
        message: "What is the team member's name?",
        validate: name => {
          if (name) {
            return true;
          } else {
            console.log('Please enter a name.');
            return false;
          }
        },
      },
      {
        type: 'input',
        name: 'id',
        message: "What is the team manager's id number?",
        validate: id => {
          if (id) {
            return true;
          } else {
            console.log('Please enter an id.');
            return false;
          }
        },
      },
      {
        type: 'input',
        name: 'email',
        message: "What is the team member's email address?",
        validate: email => {
          if (email) {
            return true;
          } else {
            console.log('Please enter an email address.');
            return false;
          }
        },
      },
      {
        type: 'input',
        name: 'github',
        message: "What is your team member's GitHub username?",
        when: input => input.role === 'Engineer',
        validate: github => {
          if (github) {
            return true;
          } else {
            console.log('Please enter a GitHub username.');
            return false;
          }
        },
      },
      {
        type: 'input',
        name: 'school',
        message: "What is your team member's school name?",
        when: input => input.role === 'Intern',
        validate: school => {
          if (school) {
            return true;
          } else {
            console.log('Please enter a school.');
            return false;
          }
        },
      },
      {
        type: 'confirm',
        name: 'confirmAddEmployees',
        message: 'Would you like to add more team members?',
        default: false,
      },
    ])
    .then(employeeInfo => {
      let { role, name, id, email, github, school, confirmAddEmployees } =
        employeeInfo;

      // if the team member is an engineer, add the HTML for an engineer card
      if (role === 'Engineer') {
        let engineer = new Engineer(name, id, email, github);
        let engineerCard = pageGenerator.addEngineer(engineer);
        fileWriting.appendFile(engineerCard);

        // if the team member is an intern, add the HTML for an intern card
      } else if (role === 'Intern') {
        let intern = new Intern(name, id, email, school);
        let internCard = pageGenerator.addIntern(intern);
        fileWriting.appendFile(internCard);
      }

      // if the user wants to add another team member, prompt is called once more
      if (confirmAddEmployees) {
        addEmployees();
      } else {
        console.log('Thank you for using the Team Roster Builder.');
      }
    });
};

promptManager()
  .then(addEmployees)
  .then(fileWriter.appendFile(pageGenerator.generateBottom()))
  .then(fileWriter.copyFile());
