
export const lowerPlugin = {
  identifier: 'lower',
  resolve: (context, value) => {
    return value.toLowerCase();
  }
};

export const upperPlugin = {
  identifier: 'upper',
  resolve: (context, value) => {
    return value.toUpperCase();
  }
}
