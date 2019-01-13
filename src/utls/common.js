const fs = require('fs');

export const readSafeSync = (filename, encoding = 'utf8') => {
  try {
    return fs.readFileSync(filename, encoding);
  } catch (e) { 
    return undefined;
  }
}

export const parseSafeSync = (src) => {
  if (typeof src !== 'string') {
    return undefined;
  }
  try {
    const o = JSON.parse(src);
    if (o) {
      return o;
    }
  } catch (e) {}
  return undefined;
};

export const search = (obj, path) => path
.replace(/\]/g, '')
.replace(/\[/g, '.') 
.split('.')
.reduce((acc, key) => acc ? acc[key] : undefined, obj);
