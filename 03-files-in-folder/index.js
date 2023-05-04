const fs = require('node:fs');
const fsPromises = fs.promises;
const path = require('node:path');

fsPromises.readdir(path.join(__dirname, 'secret-folder'), {
  withFileTypes: true
}).then(results => {
  results.forEach(result =>{
    if (!result.isDirectory()) {
      const Path = path.join(__dirname, 'secret-folder', result.name);
      const Name = path.basename(Path);
      const ext = path.extname(Path);
      fsPromises
        .stat(Path)
        .then(res => {
          console.log(`${Name.replace(ext, '')} - ${ext.replace('.', '')} - ${Number(res.size / 2000).toFixed(3)}kb`)
        });
    }
  });
});
