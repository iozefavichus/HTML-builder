const fs = require('node:fs');
const path = require('node:path');
const { stdin, stdout, exit } = require('node:process');
const pathName = path.join(__dirname,'text.txt');
const output = fs.createWriteStream(pathName);

stdout.write('Enter text, please \n');
stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
    FunctionExit();
  }
  output.write(data);
});

process.on('SIGINT', FunctionExit);

function FunctionExit() {
  stdout.write('Bye!');
  exit();
}

