import { sendData } from './api.js';

const MAX_DESCRIPTION_LENGTH = 140;
const MAX_NUMBER_OF_HASHTAGS = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ValidationMessages = {
  DESCRIPTION_LENGTH: `Длина комментария не может составлять больше ${MAX_DESCRIPTION_LENGTH} символов.`,
  NUMBER_OF_HASHTAGS: `Нельзя указывать больше ${MAX_NUMBER_OF_HASHTAGS} хэш-тегов`,
  UNIQUE_HASH_TAG: 'Один и тот же хэш-тег не может быть использован дважды',
  NOT_VALID_HASH_TAG: 'Введён невалидный хэштег',
};

const imgUploadForm = document.querySelector('.img-upload__form');
const descriptionInput = imgUploadForm.querySelector('.text__description');
const hashTagsInput = imgUploadForm.querySelector('.text__hashtags');

let pristine;

const validateStringLength = (value) => value.length <= MAX_DESCRIPTION_LENGTH;

const prepareTagsToValidate = (inputValue) => {
  const hashTags = inputValue
    .trim()
    .split(' ')
    .filter((hashTag) => hashTag.trim().length);
  return hashTags;
};

const isValidNumberOfHashTags = (inputValue) => {
  const hashTags = prepareTagsToValidate(inputValue);
  return hashTags.length <= MAX_NUMBER_OF_HASHTAGS;
};

const isUniqueHashTag = (inputValue) => {
  const hashTags = prepareTagsToValidate(inputValue);
  const lowerCaseHashTags = hashTags.map((hashTag) => hashTag.toLowerCase());
  return lowerCaseHashTags.length === new Set(lowerCaseHashTags).size;
};

const isValidHashTag = (hashTag) => VALID_SYMBOLS.test(hashTag);

const isValidHashTags = (inputValue) => {
  const hashTags = prepareTagsToValidate(inputValue);
  return hashTags.every(isValidHashTag);
};

const onimgUploadFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    sendData(evt);
  }
};

const addPristine = () => {
  pristine = new Pristine(imgUploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper',
  });

  pristine.addValidator(
    descriptionInput,
    validateStringLength,
    ValidationMessages.DESCRIPTION_LENGTH
  );

  pristine.addValidator(
    hashTagsInput,
    isValidNumberOfHashTags,
    ValidationMessages.NUMBER_OF_HASHTAGS
  );

  pristine.addValidator(
    hashTagsInput,
    isUniqueHashTag,
    ValidationMessages.UNIQUE_HASH_TAG
  );

  pristine.addValidator(
    hashTagsInput,
    isValidHashTags,
    ValidationMessages.NOT_VALID_HASH_TAG
  );

  imgUploadForm.addEventListener('submit', onimgUploadFormSubmit);
};

const destroyPristine = () => {
  pristine.destroy();
  imgUploadForm.removeEventListener('submit', onimgUploadFormSubmit);
};

export {addPristine, destroyPristine};
