const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

const dist = path.join(__dirname, 'project-dist');
const stylesPath = path.join(__dirname, 'styles');
const assetsPath = path.join(__dirname, 'assets');

// создание папки project-dist
function distDir() {
  fs.mkdir(path.join(__dirname, 'project-dist'), {
    recursive: true,
  }, err => {
       if (err) {
         throw new Error('Folder has already exsist');
       }
  })
}
distDir();

// создание markup
async function markUp (templateFile, source, destination) {
    const htmlWrite = fs.createWriteStream(destination, 'utf-8');
    const files = await fs.promises.readdir(source, {withFileTypes:true});
    const params = {};
    for (const element of files) {
      if(element.name.slice(-4) === 'html') {
        const paramName = element.name.slice(0, -5);
        const paramValue = (await fs.promises.readFile(path.join(source, element.name))).toString();
        params[paramName] = paramValue;
      }
    }

    const template = (await fs.promises.readFile(templateFile)).toString();
    let result = template;
    Object.keys(params).forEach(key => {
      result = result.replaceAll('{{' + key + '}}', params[key]);
    });
    htmlWrite.write(result, 'utf-8');
  }

  markUp(path.join(__dirname, 'template.html'), path.join(__dirname, 'components'), path.join(dist, 'index.html'));

//копируем стили
function copyStyles() {
    const output = fs.createWriteStream(path.join(dist, 'style.css'));
    fsPromises
        .readdir(stylesPath)
        .then(async (files) => {
            files.forEach(async (file) => {
                const filePath = path.join(stylesPath, file);
                const fileName = path.basename(filePath);
                const ext = path.extname(filePath);
                if (ext === '.css') {
                    const input = fs.createReadStream(path.join(stylesPath, fileName));
                    input.on('data', data => {
                      output.write(data.toString() + '\n');
                    });
                  }
            })
        })

}
copyStyles();

// перенос папки assets в папку project-dist
function copyDir(){
    fs.mkdir(path.join(dist, 'assets'), {
        recursive: true,
    }, err => {
        if(err) {
            throw new Error('Folder already exsist');
        }
    });

    async function copyFilesDir(dir, dest){
        await fsPromises
        .readdir (dir, {withFileTypes: true})
        .then(files => {
            files.forEach(async (file) =>{
                if(file.isDirectory()) {
                    const absDirPath = path.join(dir, file.name);
                    const destPath = path.join(dest, file.name);
                    copyFilesDir (absDirPath, destPath);
                }
                else {
                    fs.mkdir(dest, {
                        recursive: true,
                    }, err =>{
                        if(err) {
                            throw new Error('Folder already exsists')
                        }
                    });
                    fsPromises.copyFile(path.join(dir, file.name), path.join(dest, file.name));
                }
            })
        })

    }
    copyFilesDir(assetsPath, path.join(dist, 'assets'))

};
copyDir();