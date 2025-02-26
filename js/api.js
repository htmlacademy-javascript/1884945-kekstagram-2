import { showDataError } from './messages.js';
const SERVER_URL = 'https://31.javascript.htmlacademy.pro/kekstagram/data';

const getData = () =>
  fetch(SERVER_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      showDataError();
    });

export {getData};
