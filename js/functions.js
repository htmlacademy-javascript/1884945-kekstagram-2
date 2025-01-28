// Функция для проверки длины строки.

const validateStringLength = (validatingString, maxLength) => validatingString.length >= maxLength;

// Функция для проверки, является ли строка палиндромом.

const isPalindrom = (originalString) => {
  const cleanString = originalString.replaceAll(' ', '').toLowerCase();
  for (let i = 0; i <= cleanString.length / 2; i++) {
    if (cleanString.at(i) !== cleanString.at(-(i + 1))) {
      return false;
    }
  }
  return true;
};

// Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
// и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры,
// функция должна вернуть NaN.

const getNumbers = (originalString) => {
  const stringWithoutWhitespaces = originalString
    .toString()
    .replaceAll(' ', '');
  let stringOfNumbers = '';
  for (let i = 0; i < stringWithoutWhitespaces.length; i++) {
    if (!isNaN(+stringWithoutWhitespaces[i])) {
      stringOfNumbers += stringWithoutWhitespaces[i];
    }
  }
  if (stringOfNumbers) {
    return parseInt(stringOfNumbers, 10);
  }
  return NaN;
};

// Вызов функций, для обхода ошибки eslint ('функция' is assigned a value but never used).
validateStringLength('просто', 10);
isPalindrom('Топот');
getNumbers(-1.5);
