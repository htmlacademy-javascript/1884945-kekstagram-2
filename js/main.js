const PHOTO_DESCRIPTION_ID_MIN = 1; // Минимальное значение уникального id публикации;
const PHOTO_DESCRIPTION_ID_MAX = 25; // Максимальное значение уникального id публикации;
const COMMENT_ID_MIN = 1; // Минимальное значение уникального id комментария;
const COMMENT_ID_MAX = 999; // Максимальное значение уникального id комментария;
const COMMENTS_COUNT_MIN = 0; // Минимальное число комметариев у публикации;
const COMMENTS_COUNT_MAX = 30; // Максимальное число комметариев у публикации;
const LIKES_COUNT_MIN = 15; // Минимальное число лайков у публикации
const LIKES_COUNT_MAX = 200; // Максимальное число лайков у публикации

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

const getArrayOfConsecutiveNumbers = (min, max) =>
  Array.from({ length: max }, (_, i) => i + min);

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getUniqueRandomIdFromRange = (min, max) => {
  const RANDOM_ID_ARRAY = shuffleArray(
    getArrayOfConsecutiveNumbers(min, max)
  );
  let i = -1;

  return () => {
    i++;
    return RANDOM_ID_ARRAY[i];
  };
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const generatePhotoId = getUniqueRandomIdFromRange(
  PHOTO_DESCRIPTION_ID_MIN,
  PHOTO_DESCRIPTION_ID_MAX
);

const generateCommentId = getUniqueRandomIdFromRange(
  COMMENT_ID_MIN,
  COMMENT_ID_MAX
);

const createCommentMessage = () =>
  Array.from({ length: getRandomInteger(1, 2)}, () => getRandomArrayElement(MESSAGES)).join(' ');

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: createCommentMessage(),
  name: getRandomArrayElement(NAMES),
});

const createCommentsArray = () =>
  Array.from(
    { length: getRandomInteger(COMMENTS_COUNT_MIN, COMMENTS_COUNT_MAX) },
    createComment
  );

const createPhotoDescription = () => {
  const currentPhotoDescriptionId = generatePhotoId();
  return {
    id: currentPhotoDescriptionId,
    url: `photos/${currentPhotoDescriptionId}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(LIKES_COUNT_MIN, LIKES_COUNT_MAX),
    comments: createCommentsArray(),
  };
};

const createPhotoDescriptions = () =>
  Array.from({ length: PHOTO_DESCRIPTION_ID_MAX }, createPhotoDescription);

createPhotoDescriptions();
