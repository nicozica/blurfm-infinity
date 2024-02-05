const fs = require('fs');
const path = require('path');

const sourcePath = path.resolve(__dirname, '.htaccess');
const destinationPath = path.resolve(__dirname, 'build', '.htaccess');

fs.copyFileSync(sourcePath, destinationPath);

console.log('.htaccess copied to build directory');