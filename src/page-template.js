function addManager(manager) {
  return `
    <div class="col-md-4 col-sm-1">
        <div class="card border-info mb-3">
            <div class="card-header text-white bg-info bg-gradient">
                <h5 class="card-title">${manager.name}</h5>
                <h6 class="card-subtitle"><i class="fas fa-crown"></i> Manager</h6>
            </div>
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${manager.id}</li>
                    <li class="list-group-item">Email: <a href="mailto: ${manager.email}">${manager.email}</a></li>
                    <li class="list-group-item">Office Number: ${manager.officeNum}</li>
                </ul>
            </div>
        </div>
    </div>
    `;
}

// return card html for engineer
function addEngineer(engineer) {
  return `
    <div class="col-md-4 col-sm-1">
        <div class="card border-info mb-3">
            <div class="card-header text-white bg-info bg-gradient">
                <h5 class="card-title">${engineer.name}</h5>
                <h6 class="card-subtitle"><i class="fas fa-hat-wizard"></i> Engineer</h6>
            </div>
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${engineer.id}</li>
                    <li class="list-group-item">Email: <a href="mailto: ${engineer.email}">${engineer.email}</a></li>
                    <li class="list-group-item">GitHub: <a href="https://github.com/${engineer.gitHubId}" target="_blank">${engineer.gitHubId}</a></li>
                </ul>
            </div>
        </div>
    </div>
    `;
}

// return card for intern
function addIntern(intern) {
  return `
    <div class="col-md-4 col-sm-1">
        <div class="card border-info mb-3">
            <div class="card-header text-white bg-info bg-gradient">
                <h5 class="card-title">${intern.name}</h5>
                <h6 class="card-subtitle"><i class="fas fa-book"></i> Intern</h6>
            </div>
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${intern.id}</li>
                    <li class="list-group-item">Email: <a href="mailto: ${intern.email}">${intern.email}</a></li>
                    <li class="list-group-item">School: ${intern.school}</li>
                </ul>
            </div>
        </div>
    </div>
    `;
}

// return html for page before employee cards
function generateHero() {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
        <link rel="stylesheet" href="style.css">
        <title>Team Roster</title>
    </head>
    <body class="bg-secondary bg-opacity-10">
        <!-- header with title -->
        <header class="bg-primary text-white">
            <h1>Team Roster</h1>
        </header>
    
        <!-- container holding the team members -->
        <main class="container">
            <div class="row">`;
}

// return html for after the employee cards
function generateFooter() {
  return `
                    
            </div>
        </main>
    </body>
    </html>`;
}

module.exports = {
  generateHero,
  generateFooter,
  addEngineer,
  addIntern,
  addManager,
};
