import { onEscKeyDown, unblockSubmitButton } from './img-upload-form.js';

const DATA_ERROR_SHOW_TIME = 5000;

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

const isNotSuccessMessage = (evt) =>
  evt.target.className === 'success';

const isSuccessMessageButton = (evt) =>
  evt.target.className === 'success__button';

const isSuccessMessageOpen = () =>
  document.querySelector('.success');

const isNotErrorMessage = (evt) =>
  evt.target.className === 'error';

const isErrorMessageButton = (evt) =>
  evt.target.className === 'error__button';

const isErrorMessageOpen = () =>
  document.querySelector('.error');

const onSuccessMessageClick = (evt) => {
  if (isNotSuccessMessage(evt) || isSuccessMessageButton(evt)) {
    closeSuccessMessage();
  }
};

const onErrorMessageClick = (evt) => {
  if (isNotErrorMessage(evt) || isErrorMessageButton(evt)) {
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
  document.querySelector('.success').remove();
  successMessageElement.removeEventListener('click', onSuccessMessageClick);
  document.removeEventListener('keydown', onEscKeyDown);
}

function closeErrorMessage () {
  unblockSubmitButton();
  document.querySelector('.error').remove();
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
