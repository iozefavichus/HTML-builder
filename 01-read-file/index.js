const fs = require('node:fs');
const path = require('node:path');
const { stdout } = require('node:process');
const pathName = path.join(__dirname,'text.txt');
const input = fs.createReadStream(pathName, 'utf-8');

input.on ('data', function(data){
  stdout.write(data);
});

