const fs = require('node:fs');
const path = require('node:path');
const { stdout } = require('node:process');
const input = fs.createReadStream(path.join(__dirname,'text.txt'), 'utf-8');
input.on('data', data => stdout.write(data));