import {isEscapeKey} from './util.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const MAX_DESCRIPTION_LENGTH = 140;
const MAX_NUMBER_OF_HASHTAGS = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview img');
const effectsPreviews = imgUploadForm.querySelectorAll('.effects__preview');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const descriptionInput = imgUploadForm.querySelector('.text__description');
const hashTagsInput = imgUploadForm.querySelector('.text__hashtags');
const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const onEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadForm();
  }
};

const onInputInFocusKeyDown = (evt) => {
  evt.stopPropagation();
};

const onImgUploadCancelClick = () => {
  closeUploadForm();
};

const onImgUploadPreviewLoad = () => {
  URL.revokeObjectURL(imgUploadPreview.src);
};

const renderPreview = () => {
  const file = imgUploadInput.files[0];
  const fileName = file.name;
  const matches = FILE_TYPES.some((type) => fileName.toLowerCase().endsWith(type));

  if (matches) {
    const previewUrl = URL.createObjectURL(file);
    imgUploadPreview.src = previewUrl;
    effectsPreviews.forEach(
      (element) => (element.style.backgroundImage = `url(${previewUrl})`)
    );
    // Удаляет object URL.
    imgUploadPreview.addEventListener('load', onImgUploadPreviewLoad);
  }
};

const onImgUploadInputChange = () => {
  renderPreview();
  openUploadForm();
};

// function declaration для поднятия и возможности использования в функциях выше.

function openUploadForm() {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  imgUploadCancel.addEventListener('click', onImgUploadCancelClick);
  document.addEventListener('keydown', onEscKeyDown);
  descriptionInput.addEventListener('keydown', onInputInFocusKeyDown);
  hashTagsInput.addEventListener('keydown', onInputInFocusKeyDown);
}

function closeUploadForm() {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadInput.value = null;

  imgUploadPreview.removeEventListener('load', onImgUploadPreviewLoad);
  imgUploadCancel.removeEventListener('click', onImgUploadCancelClick);
  document.removeEventListener('keydown', onEscKeyDown);
  descriptionInput.removeEventListener('keydown', onInputInFocusKeyDown);
  hashTagsInput.removeEventListener('keydown', onInputInFocusKeyDown);
}

// Валидация комментария
const validateStringLength = (value) => value.length <= MAX_DESCRIPTION_LENGTH;
pristine.addValidator(descriptionInput, validateStringLength, 'Длина комментария не может составлять больше 140 символов.');

// Валидация хэш-тегов
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

const viewRequirementsForVaildHashTag = () =>
  `Хэш-тэг должен соответсвовать следующим требованиям:<br>
  - хэш-тег начинается с символа # (решётка);<br>
  - строка после решётки должна состоять из букв и чисел и не может содержать пробелы,
    спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.),
    эмодзи и т. д.;<br>
  - хеш-тег не может состоять только из одной решётки;<br>
  - максимальная длина одного хэш-тега 20 символов, включая решётку.`;

pristine.addValidator(
  hashTagsInput,
  isValidNumberOfHashTags,
  'Нельзя указывать больше пяти хэш-тегов'
);

pristine.addValidator(
  hashTagsInput,
  isUniqueHashTag,
  'Один и тот же хэш-тег не может быть использован дважды'
);

pristine.addValidator(
  hashTagsInput,
  isValidHashTags,
  viewRequirementsForVaildHashTag()
);

const onimgUploadFormSubmit = (evt) => {
  const isValid = pristine.validate();
  if (isValid) {
    // Отправляем на сервер.
  } else {
    // Не отправляем на сервер.
    evt.preventDefault();
  }
};

imgUploadForm.addEventListener('submit', onimgUploadFormSubmit);


export {onImgUploadInputChange};
