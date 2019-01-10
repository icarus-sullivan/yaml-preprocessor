import { search } from '../utls/common';

export default {
  identifier: 'self',
  resolve: (context, path, defaultValue) => {
    const { src } = context;

    return search(src, path) || defaultValue;
  }
};
