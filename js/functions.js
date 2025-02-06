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

// Функция, которая принимает время начала и конца рабочего дня, а также время старта и продолжительность
// встречи в минутах и возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит.
const isEnoughTime = (beginTimeString, finishTimeString, startTimeString, duration) => {
  const beginTime = beginTimeString.split(':');
  const finishTime = finishTimeString.split(':');
  const startTime = startTimeString.split(':');

  if ((+startTime[0] < +beginTime[0]) || (+startTime[0] === +beginTime[0] && +startTime[1] < +beginTime[1])) {
    return false;
  }

  if (((+finishTime[0] * 60 + (+finishTime[1])) - (+startTime[0] * 60 + (+startTime[1]))) >= duration) {
    return true;
  }

  return false;
};

// Вызов функций, для обхода ошибки eslint ('функция' is assigned a value but never used).
validateStringLength('просто', 10);
isPalindrome('Топот');
getNumbers(-1.5);
isEnoughTime('8:00', '17:30', '08:00', 900);
