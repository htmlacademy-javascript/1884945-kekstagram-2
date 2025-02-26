const DATA_ERROR_SHOW_TIME = 5000;

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const dataErrorElement = dataErrorTemplate.cloneNode(true);

const showDataError = () => {
  document.body.append(dataErrorElement);
  setTimeout(() => {
    dataErrorElement.remove();
  }, DATA_ERROR_SHOW_TIME);
};

export {showDataError};
