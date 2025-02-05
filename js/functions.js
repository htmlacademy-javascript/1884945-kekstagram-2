// Функция для проверки длины строки.

const validateStringLength = (validatedString, maxLength) => validatedString.length >= maxLength;

// Функция для проверки, является ли строка палиндромом.

const isPalindrome = (originalString) => {
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

const getNumbers = (originalString) => parseInt((originalString.toString().replaceAll(/\D/g, '')), 10);

// Вызов функций, для обхода ошибки eslint ('функция' is assigned a value but never used).
validateStringLength('просто', 10);
isPalindrome('Топот');
getNumbers(-1.5);
