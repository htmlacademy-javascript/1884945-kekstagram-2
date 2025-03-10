import { onEscKeyDown, unblockSubmitButton } from './img-upload-form.js';

const DATA_ERROR_SHOW_TIME = 5000;
const MessageClasses = {
  SUCCESS: 'success',
  SUCCESS_BUTTON: 'success__button',
  ERROR: 'error',
  ERROR_BUTTON: 'error__button',
};

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessageElement = successMessageTemplate.cloneNode(true);
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessageElement = errorMessageTemplate.cloneNode(true);

const showDataError = () => {
  const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const dataErrorElement = dataErrorTemplate.cloneNode(true);

  document.body.append(dataErrorElement);
  setTimeout(() => {
    dataErrorElement.remove();
  }, DATA_ERROR_SHOW_TIME);
};

const isSuccessMessageOverlay = (evt) =>
  evt.target.className === MessageClasses.SUCCESS;

const isSuccessMessageButton = (evt) =>
  evt.target.className === MessageClasses.SUCCESS_BUTTON;

const isSuccessMessageOpen = () =>
  document.querySelector(`.${MessageClasses.SUCCESS}`);

const isErrorMessageOverlay = (evt) =>
  evt.target.className === MessageClasses.ERROR;

const isErrorMessageButton = (evt) =>
  evt.target.className === MessageClasses.ERROR_BUTTON;

const isErrorMessageOpen = () =>
  document.querySelector(`.${MessageClasses.ERROR}`);

const onSuccessMessageClick = (evt) => {
  if (isSuccessMessageOverlay(evt) || isSuccessMessageButton(evt)) {
    closeSuccessMessage();
  }
};

const onErrorMessageClick = (evt) => {
  if (isErrorMessageOverlay(evt) || isErrorMessageButton(evt)) {
    closeErrorMessage();
  }
};

const showSuccessMessage = () => {
  document.body.append(successMessageElement);
  successMessageElement.addEventListener('click', onSuccessMessageClick);
  document.addEventListener('keydown', onEscKeyDown);
};

const showErrorMessage = () => {
  document.body.append(errorMessageElement);
  errorMessageElement.addEventListener('click', onErrorMessageClick);
};

// function declaration для поднятия и возможности использования в функциях выше.

function closeSuccessMessage () {
  document.querySelector(`.${MessageClasses.SUCCESS}`).remove();
  successMessageElement.removeEventListener('click', onSuccessMessageClick);
  document.removeEventListener('keydown', onEscKeyDown);
}

function closeErrorMessage () {
  unblockSubmitButton();
  document.querySelector(`.${MessageClasses.ERROR}`).remove();
  document.removeEventListener('keydown', closeErrorMessage);
}

export {
  isSuccessMessageOpen,
  isErrorMessageOpen,
  showDataError,
  showSuccessMessage,
  showErrorMessage,
  closeSuccessMessage,
  closeErrorMessage
};
