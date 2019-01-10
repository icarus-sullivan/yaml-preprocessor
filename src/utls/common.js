const fs = require('fs');

export const readSafeSync = (filename, encoding) => {
  try {
    return fs.readFileSync(filename, encoding);
  } catch (e) { 
    return undefined;
  }
}

export const search = (obj, path) => path
.replace(/\]/g, '')
.replace(/\[/g, '.') 
.split('.')
.reduce((acc, key) => acc ? acc[key] : undefined, obj);
