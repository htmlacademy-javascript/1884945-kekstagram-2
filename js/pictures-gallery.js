
import {renderPictures} from './render-pictures.js';
import {onPictureClick} from './render-picture-card.js';
import {onImgUploadInputChange} from './img-upload-form.js';

const initImgUploadInput = () => {
  const imgUploadInput = document.querySelector('.img-upload__input');

  imgUploadInput.addEventListener('change', onImgUploadInputChange);
};

const initPicturesGallery = (photoDescriptions) => {
  initImgUploadInput();
  if (photoDescriptions) {
    const pictures = document.querySelector('.pictures');

    renderPictures(photoDescriptions);
    pictures.addEventListener('click', onPictureClick.bind(null, photoDescriptions));
  }
};

export {initPicturesGallery};
