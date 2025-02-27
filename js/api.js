const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const getData = (onError) =>
  fetch(`${BASE_URL}${Route.GET_DATA}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      onError();
    });

const sendData = (evt, onSuccess, onError, onFinally) => {
  const formData = new FormData(evt.target);

  fetch(`${BASE_URL}${Route.SEND_DATA}`, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      onSuccess();
    })
    .catch(() => {
      onError();
    })
    .finally(() => {
      onFinally();
    });
};

export {getData, sendData};
