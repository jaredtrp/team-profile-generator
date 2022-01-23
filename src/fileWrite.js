const fs = require('fs');

// Copies the CSS file to dist folder
const copyFile = () => {
  return new Promise((resolve, reject) => {
    fs.copyFile('./src/style.css', './dist/style.css', err => {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        ok: true,
        message: 'Stylesheet created.',
      });
    });
  });
};

// Writes the hero of the index.html
const writeFile = createHTML => {
  return new Promise((resolve, reject) => {
    fs.writeFile('./dist/index.html', createHTML, err => {
      if (err) {
        reject(err);
        return;
      }
      resolve({
        ok: true,
        message: 'Index file created.',
      });
    });
  });
};

// Adds the remaining content to the index.html
const appendFile = bodyContent => {
  return new Promise((resolve, reject) => {
    fs.appendFile('./dist/index.html', bodyContent, err => {
      if (err) {
        reject(err);
        return;
      }
      resolve({
        ok: true,
        message: 'File appended.',
      });
    });
  });
};

module.exports = { copyFile, writeFile, appendFile };
