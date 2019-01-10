import { search } from '../utls/common';

export default {
  identifier: 'opt',
  resolve: (context, path, defaultValue) => {
    const { options } = context;

    return search(options, path) || defaultValue;
  }
};
