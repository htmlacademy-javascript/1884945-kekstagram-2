import { isEscapeKey } from './util.js';
import { addPristine, destroyPristine, validateImgUploadForm } from './validation.js';
import { addScale, resetScale } from './img-scale.js';
import { addImgEffects, removeImgEffects } from './img-effects.js';
import { isSuccessMessageOpen, isErrorMessageOpen, showSuccessMessage, showErrorMessage, closeSuccessMessage, closeErrorMessage } from './messages.js';
import { sendData } from './api.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикация...'
};

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview img');
const effectsPreviews = imgUploadForm.querySelectorAll('.effects__preview');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const descriptionInput = imgUploadForm.querySelector('.text__description');
const hashTagsInput = imgUploadForm.querySelector('.text__hashtags');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');

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

const onEscKeyDown = (evt) => {
  if (!isEscapeKey(evt)) {
    return;
  }

  evt.preventDefault();

  if (isSuccessMessageOpen()) {
    return closeSuccessMessage();
  }

  if (isErrorMessageOpen()) {
    return closeErrorMessage();
  }

  closeUploadForm();
};

const onInputInFocusKeyDown = (evt) => {
  evt.stopPropagation();
};

const onImgUploadCancelClick = () => {
  closeUploadForm();
};

const onImgUploadInputChange = () => {
  renderPreview();
  openUploadForm();
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const onimgUploadFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = validateImgUploadForm();

  if (isValid) {
    blockSubmitButton();
    sendData(evt)
      .then(() => {
        unblockSubmitButton();
        closeUploadForm();
        showSuccessMessage();
      })
      .catch(() => showErrorMessage());
  }
};

// function declaration для поднятия и возможности использования в функциях выше.

function openUploadForm() {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  addPristine(imgUploadForm, onimgUploadFormSubmit);
  addScale();
  addImgEffects();

  imgUploadCancel.addEventListener('click', onImgUploadCancelClick);
  document.addEventListener('keydown', onEscKeyDown);
  descriptionInput.addEventListener('keydown', onInputInFocusKeyDown);
  hashTagsInput.addEventListener('keydown', onInputInFocusKeyDown);
}

function closeUploadForm() {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetScale();
  removeImgEffects();
  imgUploadForm.reset();
  destroyPristine(imgUploadForm, onimgUploadFormSubmit);

  imgUploadPreview.removeEventListener('load', onImgUploadPreviewLoad);
  imgUploadCancel.removeEventListener('click', onImgUploadCancelClick);
  document.removeEventListener('keydown', onEscKeyDown);
  descriptionInput.removeEventListener('keydown', onInputInFocusKeyDown);
  hashTagsInput.removeEventListener('keydown', onInputInFocusKeyDown);
}

export { onImgUploadInputChange, closeUploadForm, onEscKeyDown, unblockSubmitButton };
