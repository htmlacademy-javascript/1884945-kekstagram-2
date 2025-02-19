import {photoDescriptions} from './mock-data.js';
import {renderPictures} from './render-pictures.js';
import {onPictureClick} from './render-picture-card.js';
import {onImgUploadInputChange} from './img-upload-form.js';

const initPicturesGallery = () => {
  const pictures = document.querySelector('.pictures');
  const imgUploadInput = document.querySelector('.img-upload__input');

  renderPictures(photoDescriptions);
  pictures.addEventListener('click', onPictureClick);

  imgUploadInput.addEventListener('change', onImgUploadInputChange);
};

export {initPicturesGallery};
