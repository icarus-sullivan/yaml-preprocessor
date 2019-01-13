import { search } from '../utls/common';

export default {
  identifier: 'data',
  resolve: (context, path, defaultValue) => {
    const { data } = context;

    return search(data, path) || defaultValue;
  }
};
