
import { getData } from './api.js';
import { showDataError } from './messages.js';
import { renderPictures } from './render-pictures.js';
import { isPicture, renderPictureCard, openPictureCard } from './render-picture-card.js';
import { onImgUploadInputChange } from './img-upload-form.js';

const photoDescriptions = await getData()
  .catch(() => {
    showDataError();
  });

const onPictureClick = (evt) => {
  if (isPicture(evt)) {
    evt.preventDefault();
    renderPictureCard(evt, photoDescriptions);
    openPictureCard();
  }
};

const initImgUploadInput = () => {
  const imgUploadInput = document.querySelector('.img-upload__input');

  imgUploadInput.addEventListener('change', onImgUploadInputChange);
};

const initPicturesGallery = () => {
  initImgUploadInput();
  if (photoDescriptions) {
    const pictures = document.querySelector('.pictures');

    renderPictures(photoDescriptions);
    pictures.addEventListener('click', onPictureClick);
  }
};

export { initPicturesGallery };
