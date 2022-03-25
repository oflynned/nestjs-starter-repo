export const wait = (delay = 1000): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (delay < 0) {
      reject();
    }

    setTimeout(() => {
      resolve();
    }, delay);
  });
};
