const fs = require('node:fs');
const fsPromises = fs.promises;
const path = require('node:path');
const NewFile = fsPromises.copyFile;

function copyDir(){
  fs.mkdir(path.join(__dirname, 'files-copy'), {
    recursive: true,
  }, err => { if (err) {
    throw new Error('Folder already exsists');
  }
  });

  fsPromises
    .readdir(path.join(__dirname,'files'))
    .then(files => {
      files.forEach(file => {
        const filePath = path.join(__dirname, 'files', file);
        NewFile(filePath, path.join(__dirname, 'files-copy', file));
      });
    });
}
copyDir();
