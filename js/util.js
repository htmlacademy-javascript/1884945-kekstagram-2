const ESC_KEY = 'Escape';
const DEBOUNCE_DELAY = 500;

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const makeCounter = (counterInitialValue = 1) => {
  let currentCount = counterInitialValue;
  return () => currentCount++;
};

const shuffleArray = (elements) => {
  for (let i = elements.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
    [elements[i], elements[j]] = [elements[j], elements[i]];
  }
  return elements;
};

const isEscapeKey = (evt) => evt.key === ESC_KEY;

const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};

export {
  getRandomInteger,
  makeCounter,
  shuffleArray,
  isEscapeKey,
  debounce
};
