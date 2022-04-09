const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');
const inquirer = require('inquirer');
const fs = require('fs');
const copyFile = require('./src/page-write');
const engineers = [];

const promptManager = [
  {
    type: 'input',
    name: 'name',
    message: "What is the manager's name?",
  },
  {
    type: 'input',
    name: 'id',
    message: 'What is the id of the manager?',
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is the email address of the manager?',
  },
  {
    type: 'input',
    name: 'officeNumber',
    message: 'What is the office number of the manager?',
  },
];

const promptEmployee = () => {
  return inquirer
    .prompt([
      {
        type: 'list',
        message: 'What type of employee would you like to add to the team?',
        name: 'action',
        choices: ['Engineer', 'Intern'],
      },
    ])
    .then(({ action }) => {
      if (action === 'Engineer') {
        promptEngineer();
      } else {
        promptIntern();
      }
    });
};

const promptEngineer = () => {
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the engineer you are trying to add?',
      },
      {
        type: 'input',
        name: 'id',
        message: 'What is the employee id for the engineer you are adding?',
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is the email address of the engineer you are adding?',
      },
      {
        type: 'input',
        name: 'github',
        message: 'What is the GitHub username of the engineer you are adding?',
      },
      {
        type: 'confirm',
        name: 'confirmAdd',
        message: 'Would you like to add another employee to the current team?',
        default: true,
      },
    ])
    .then(function ({ name, id, email, github, confirmAdd }) {
      var engineer = new Engineer(name, id, email, github);
      engineers.push(engineer);
      // console.log(engineer.name);
      return confirmAdd;
    })
    .then(confirmAdd => {
      if (confirmAdd) {
        promptEmployee();
      } else {
        return generateEmployee(engineers);
      }
    });
};

const promptIntern = () => {
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message:
          'What is the name of the intern you would like to add to the team?',
      },
      {
        type: 'input',
        name: 'id',
        message:
          'What is the id of the intern you would like to add to the team?',
      },
      {
        type: 'input',
        name: 'email',
        message:
          'What is the email address of the intern you would like to add to the team?',
        validate: emailInput => {
          if (emailInput) {
            return true;
          } else {
            console.log('Employee must have a valid email!');
            return false;
          }
        },
      },
      {
        type: 'input',
        name: 'school',
        message: 'What is the name of the school the intern is attending?',
      },
      {
        type: 'confirm',
        name: 'confirmAdd',
        message: 'Would you like to add another employee to the current team?',
        default: false,
      },
    ])
    .then(({ name, id, email, school, confirmAdd }) => {
      var intern = new Intern(name, id, email, school);
      engineers.push(intern);
      return confirmAdd;
    })
    .then(confirmAdd => {
      if (confirmAdd) {
        promptEmployee();
      } else {
        return generateEmployee(engineers);
      }
    });
};

const generateEmployee = () => {
  const pageArray = [];
  const pageStart = `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Team Structure</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
        <link href="https://fonts.googleapis.com/css?family=Public+Sans:300i,300,500&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="style.css">
    </head>

    <body>
        <header>
            <div class="headerLine">
                <h1 class="page-title">Team Structure</h1>
            </div>
        </header>
        <main class="container">`;

  pageArray.push(pageStart);

  for (let i = 0; i < engineers.length; i++) {
    let eachEmployee = `
            <div class="card display-inline-block">
                <div class="card-head">
                    <h2>${engineers[i].name}</h2>
                    <h2>${engineers[i].getRole()}</h2>
                </div>
                <div class="card-body">
                    <p>Employee ID: ${engineers[i].id}</p>
                    <a href="mailto:${engineers[i].email}">Email: ${
      engineers[i].email
    }</a>`;
    if (engineers[i].officeNumber) {
      eachEmployee += `
                    <p>Office Number:${engineers[i].officeNumber}</p>`;
    }

    if (engineers[i].github) {
      eachEmployee += `
                    <P><a href="https://github.com/${engineers[i].github}">Github</a></p>`;
    }

    if (engineers[i].school) {
      eachEmployee += `
                    <p>University: ${engineers[i].school}</p>`;
    }

    eachEmployee += `
                </div>
            </div>`;
    pageArray.push(eachEmployee);
  }

  const pageEnd = `
        </main>
        <footer class="foot">
            <h3 class="foot-text">&copy; ${new Date().getFullYear()}</h3>
        </footer>
    </body>
    </html>
    `;

  pageArray.push(pageEnd);

  fs.writeFile(`./dist/team.html`, pageArray.join(''), function (err) {
    if (err) {
      return;
    }
  });
};

function init() {
  inquirer
    .prompt(promptManager)
    .then(function ({ name, id, email, officeNumber }) {
      var manager = new Manager(name, id, email, officeNumber);
      engineers.push(manager);
      return;
    })
    .then(promptEmployee)
    .then(copyFile);
}

init();
