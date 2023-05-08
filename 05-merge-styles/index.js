const fs = require('node:fs');
const fsPromises = fs.promises;
const path = require('node:path');
const styles = path.join(__dirname, 'styles');
const dist = path.join(__dirname, 'project-dist/bundle.css');
const output = fs.createWriteStream(dist);

fsPromises
  .readdir(styles)
  .then(async (files) => {
    files.forEach(async (file) => {
      const filePath = path.join(styles, file);
      const fileName = path.basename(filePath);
      const ext = path.extname(filePath);
      if (ext === '.css') {
        const input = fs.createReadStream(path.join(styles, fileName));
        input.on('data', data => {
          output.write(data.toString() + '\n');
        });
      }
    });
  });