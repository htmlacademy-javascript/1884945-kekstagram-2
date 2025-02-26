import { showDataError, showSuccessMessage, showErrorMessage } from './messages.js';
import { closeUploadForm } from './img-upload-form.js';
const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикация...'
};

const blockSubmitButton = (submitButton) => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = (submitButton) => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const getData = () =>
  fetch(`${BASE_URL}${Route.GET_DATA}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      showDataError();
    });

const sendData = (evt) => {
  const formData = new FormData(evt.target);
  const submitButton = evt.target.querySelector('.img-upload__submit');
  blockSubmitButton(submitButton);

  fetch(`${BASE_URL}${Route.SEND_DATA}`, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      closeUploadForm();
      showSuccessMessage();
    })
    .catch(() => {
      showErrorMessage();
    })
    .finally(() => {
      unblockSubmitButton(submitButton);
    });
};

export {getData, sendData};
