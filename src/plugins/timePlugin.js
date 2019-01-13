

export default {
  identifier: 'date',
  resolve: (context, some, value, here) => {
    const now = new Date(Date.now());
    switch (some) {
      case 'iso': {
        return now.toISOString();
      }
      case 'utc': {
        return now.toUTCString();
      }
      default: {
        return now.toLocaleDateString();
      }
    }
  }
}