export const passwordValitdation = (password) => {
  const caps = /[A-Z]/g;
  const capsFound = password.match(caps);

  const numbers = /[0-9]/g;
  const numbersFound = password.match(numbers);

  const specialChars = /[^a-zA-Z0-9\s_@]/g;
  const specialCharsFound = password.match(specialChars);

  if (
    capsFound === null ||
    numbersFound === null ||
    specialCharsFound === null
  ) {
    return false;
  } else {
    return true;
  }
};
