import {photoDescriptions} from './mock-data.js';
import {renderPictures} from './render-pictures.js';
import {onPictureClick} from './render-picture-card.js';

const initPicturesGallery = () => {
  const pictures = document.querySelector('.pictures');

  renderPictures(photoDescriptions);
  pictures.addEventListener('click', onPictureClick);
};

export {initPicturesGallery};
