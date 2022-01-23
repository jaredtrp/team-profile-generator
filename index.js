const fs = require('fs');
const inquirer = require('inquirer');
const fileWriter = require('./src/fileWrite');
const pageGenerator = require('./src/page-template');
const Engineer = require('.lib/Engineer');
const Intern = require('.lib/Intern');
const Manager = require('.lib/');
const { createPublicKey } = require('crypto');

// USER STORY
// AS A manager
// I WANT to generate a webpage that displays my team's basic info
// SO THAT I have quick access to their emails and GitHub profiles

// ACCEPTANCE CRITERIA
// GIVEN a command-line application that accepts user input
// WHEN I am prompted for my team members and their information
// THEN an HTML file is generated that displays a nicely formatted team roster based on user input
// WHEN I click on an email address in the HTML
// THEN my default email program opens and populates the TO field of the email with the address
// WHEN I click on the GitHub username
// THEN that GitHub profile opens in a new tab
// WHEN I start the application
// THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number
// WHEN I enter the team manager’s name, employee ID, email address, and office number
// THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team
// WHEN I select the engineer option
// THEN I am prompted to enter the engineer’s name, ID, email, and GitHub username, and I am taken back to the menu
// WHEN I select the intern option
// THEN I am prompted to enter the intern’s name, ID, email, and school, and I am taken back to the menu
// WHEN I decide to finish building my team
// THEN I exit the application, and the HTML is generated

// Prompt the user for the manager data
const initManager = () => {
  console.log('Please build your team');
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: `What is the team manager's name?`,
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
        type: 'number',
        name: 'id',
        message: `What is the team manager's id number?`,
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
        message: `What is the team manager's email address?`,
        validate: email => {
          if (email) {
            return true;
          } else {
            console.log(`Please enter an email address.`);
            return false;
          }
        },
      },
      {
        type: 'input',
        name: 'officeNum',
        message: `What is the team manager's office number?`,
        validate: officeNum => {
          if (officeNum) {
            return true;
          } else {
            console.log(`Please enter an office number.`);
            return false;
          }
        },
      },
    ])
    .then(managerData => {
      // creates the index.html page
      const topPage = generatePage.generateTop();
      fileWriting.writeFile(topPage);

      // creates the manager object with the info given
      const { name, id, email, officeNum } = managerInfo;
      const manager = new Manager(name, id, email, officeNum);

      // creates the manager card and append it to the html page
      const managerData = generatePage.addManager(manager);
      fileWriting.appendFile(managerData);
    });
};

const addEmployees = () => {
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
        message: `What is the team member's name?`,
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
        type: 'number',
        name: 'id',
        message: `What is the team manager's id number?`,
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
        message: `What is the team member's email address?`,
        validate: email => {
          if (email) {
            return true;
          } else {
            console.log(`Please enter an email address.`);
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

      // if the team member is an engineer, it'll add the card HTML for an engineer
      if (role === 'Engineer') {
        let engineer = new Engineer(name, id, email, github);
        let engineerHTML = generatePage.addEngineer(engineer);
        fileWriting.appendFile(engineerHTML);

        // if the team member is an intern, it'll add the card HTML for an intern
      } else if (role === 'Intern') {
        let intern = new Intern(name, id, email, school);
        let internHTML = generatePage.addIntern(intern);
        fileWriting.appendFile(internHTML);
      }

      // if the user wants to add another team member, prompt is called once more
      if (confirmAddEmployees) {
        addEmployees();
      }
    });
};

initManager()
  .then(addEmployees)
  .then(fileWriting.appendFile(generatePage.generateBottom()))
  .then(fileWriting.copyFile());
