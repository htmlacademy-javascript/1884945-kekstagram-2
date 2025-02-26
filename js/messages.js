import { isEscapeKey } from './util.js';
import { onEscKeyDown } from './img-upload-form.js';

const DATA_ERROR_SHOW_TIME = 5000;

const showDataError = () => {
  const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const dataErrorElement = dataErrorTemplate.cloneNode(true);

  document.body.append(dataErrorElement);
  setTimeout(() => {
    dataErrorElement.remove();
  }, DATA_ERROR_SHOW_TIME);
};

const closeSuccessMessage = (evt) => {
  if (
    evt.target.className === 'success' ||
    evt.target.className === 'success__button' ||
    isEscapeKey(evt)
  ) {
    document.querySelector('.success').remove();
    document.removeEventListener('keydown', closeSuccessMessage);
  }
};

const showSuccessMessage = () => {
  const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessageElement = successMessageTemplate.cloneNode(true);
  document.body.append(successMessageElement);
  successMessageElement.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', closeSuccessMessage);
};

const closeErrorMessage = (evt) => {
  if (
    evt.target.className === 'error' ||
    evt.target.className === 'error__button' ||
    isEscapeKey(evt)
  ) {
    document.querySelector('.error').remove();
    document.removeEventListener('keydown', closeErrorMessage);
    document.addEventListener('keydown', onEscKeyDown);
  }
};

const showErrorMessage = () => {
  const errorMessageTemplate = document
    .querySelector('#error')
    .content.querySelector('.error');
  const errorMessageElement = errorMessageTemplate.cloneNode(true);
  document.body.append(errorMessageElement);
  errorMessageElement.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', closeErrorMessage);
  document.removeEventListener('keydown', onEscKeyDown);
};


export {showDataError, showSuccessMessage, showErrorMessage};
