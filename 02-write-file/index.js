const fs = require('fs');
const path = require('node:path');
const { stdin, stdout, exit } = require('process');
const absPath = path.join(__dirname,'text.txt');
const output = fs.createWriteStream(absPath);

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

