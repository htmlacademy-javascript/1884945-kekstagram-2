const NUMBER_OF_PHOTO_DESCRIPTIONS = 25; // Число временных описаний фото которые необходимо сгенерировать;

const numberOfComments = {
  'MIN': 0, // Минимальное число комметариев у публикации;
  'MAX': 30, // Максимальное число комметариев у публикации;
};

const numberOfLikes = {
  'MIN': 15, // Минимальное число лайков у публикации
  'MAX': 200, // Максимальное число лайков у публикации
};

const numberOfMessages = {
  'MIN': 1, // Минимальное число сообщений в комментарии
  'MAX': 2, // Максимальное число сообщений в комментарии
};

const rangeForAvatarNumbers = {
  'MIN': 1, // Минимальное значение для диапозона возможных номеров аватарок
  'MAX': 6, // Максимальное значение для диапозона возможных номеров аватарок
};

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
];

const DESCRIPTIONS = [
  'Моё любимое фото',
  'Опробовал новый фотоаппарат',
  'Фото через новый объектив',
  'Будничное фото',
  'Фото под настроение',
];

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

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const photoIdCounter = makeCounter();

const commentIdCounter = makeCounter();

const createCommentMessage = () =>
  Array.from({ length: getRandomInteger(numberOfMessages.MIN, numberOfMessages.MAX)}, () => getRandomArrayElement(MESSAGES)).join(' ');

const createComment = () => ({
  id: commentIdCounter(),
  avatar: `img/avatar-${getRandomInteger(rangeForAvatarNumbers.MIN, rangeForAvatarNumbers.MAX)}.svg`,
  message: createCommentMessage(),
  name: getRandomArrayElement(NAMES),
});

const createCommentsArray = () =>
  Array.from(
    { length: getRandomInteger(numberOfComments.MIN, numberOfComments.MAX) },
    createComment
  );

const createPhotoDescription = () => {
  const currentPhotoDescriptionId = photoIdCounter();
  return {
    id: currentPhotoDescriptionId,
    url: `photos/${currentPhotoDescriptionId}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(numberOfLikes.MIN, numberOfLikes.MAX),
    comments: createCommentsArray(),
  };
};

const createPhotoDescriptions = () =>
  Array.from({ length: NUMBER_OF_PHOTO_DESCRIPTIONS }, createPhotoDescription);

createPhotoDescriptions();
