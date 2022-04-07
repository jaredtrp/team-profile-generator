const generatePage = memberData => {
  if (!memberData) {
    return '';
  }
  console.log('here is the info parsed' + memberData);

  return memberData.map(
    ({ name, id, email, officeNumber, github, school, role }) => {
      let variant;
      if (officeNumber) {
        variant = `<h3>Office Number: ${officeNumber}</h3>`;
      } else if (github) {
        variant = `<h3>GitHub Account: ${github}</h3>`;
      } else if (school) {
        variant = `<h3>School: ${school}</h3>`;
      }
      return `
              <section class="card" id="teamMemberCard">
                  <div class="card-header" id="memberHeader">
                      <h1>${name}</h1>
                      <h2>Role: ${role}</h2>
                      <h2>Employee ID: ${id}</h2>
                  </div>
                  <div class="card-body" id="teamMemberInfo">
                      <h3>Email: ${email}</h3>
                      ${variant}
              </section>
          `;
    }
  );
};

module.exports = teamData => {
  console.log('teamData here: ' + typeof teamData);
  return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>My Team</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
        <link href="https://fonts.googleapis.com/css?family=Public+Sans:300i,300,500&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="style.css">
    </head>
        
    <body>
        <header>
        <div class="container flex-row justify-space-between align-center py-3">
            <h1 class="page-title text-secondary bg-dark py-2 px-3"></h1>
            <nav class="flex-row">
            
            </nav>
        </div>
        </header>
        <main class="container my-5">
            ${generatePage(teamData)}
        </main>
        <footer class="container text-center py-3">
        <h3 class="text-dark">&copy;2020 by </h3>
        </footer>
    </body>
    </html>
    `;
};
