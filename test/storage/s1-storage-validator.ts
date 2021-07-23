export const validateParams = (value: object): string[] => {
  return Object(value).hasOwnProperty('path') ? [] : ['Missing path'];
};
