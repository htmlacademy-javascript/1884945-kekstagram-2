
import { getData } from './api.js';
import { showDataError } from './messages.js';
import { renderPictures } from './render-pictures.js';
import { isPicture, renderPictureCard, openPictureCard } from './render-picture-card.js';
import { onImgUploadInputChange } from './img-upload-form.js';
import { initFilters } from './filters.js';

const initImgUploadInput = () => {
  const imgUploadInput = document.querySelector('.img-upload__input');

  imgUploadInput.addEventListener('change', onImgUploadInputChange);
};

const initPicturesGallery = async () => {
  initImgUploadInput();
  try {
    const photoDescriptions = await getData();
    if (photoDescriptions) {
      const onPictureClick = (evt) => {
        if (isPicture(evt)) {
          evt.preventDefault();
          renderPictureCard(evt, photoDescriptions);
          openPictureCard();
        }
      };

      const pictures = document.querySelector('.pictures');

      renderPictures(photoDescriptions);
      pictures.addEventListener('click', onPictureClick);

      initFilters(photoDescriptions);
    }
  } catch {
    showDataError();
  }
};

export { initPicturesGallery };
