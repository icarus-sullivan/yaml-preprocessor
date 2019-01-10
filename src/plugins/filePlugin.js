import yaml from 'js-yaml';
import { readSafeSync } from '../utls/common';

export default {
  identifier: 'file',
  resolve: (context, filename, variable, defaultValue) => {
    const contents = readSafeSync(filename, 'utf8');
    // contents wasn't found, just return defaultValue 
    if (!contents) {
      return defaultValue;
    }

    // load yaml->js
    const loadedFile = yaml.safeLoad(contents);

    // if variable pass that back
    if (variable) {
      return loadedFile[variable] || defaultValue;
    }
    
    return loadedFile;
  }
};