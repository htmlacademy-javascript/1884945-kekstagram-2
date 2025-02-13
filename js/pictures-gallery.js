import {photoDescriptions} from './mock-data.js';
import {isEscapeKey} from './util.js';
import {renderPictures} from './render-pictures.js';
import {renderPictureCard, commentsLoader, renderPortionOfComments} from './render-picture-card.js';

const pictures = document.querySelector('.pictures');
const pictureCard = document.querySelector('.big-picture');
const pictureCardCloseButton = pictureCard.querySelector('.big-picture__cancel');

const isPicture = (evt) => evt.target.closest('.picture');

const onPictureClick = (evt) => {
  if (isPicture(evt)) {
    evt.preventDefault();
    renderPictureCard(evt);
    openPictureCard();
  }
};

const onpictureCardCloseButtonClick = () => {
  closePictureCard();
};

const onEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    closePictureCard();
  }
};

const onCommentsLoaderClick = () => {
  renderPortionOfComments();
};

// function declaration для поднятия и возможности использования в функциях выше.
function openPictureCard() {
  pictureCard.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onEscKeyDown);
  pictureCardCloseButton.addEventListener('click', onpictureCardCloseButtonClick);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
  pictures.removeEventListener('click', onPictureClick);
}

function closePictureCard() {
  pictureCard.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  pictures.addEventListener('click', onPictureClick);
  document.removeEventListener('keydown', onEscKeyDown);
  pictureCardCloseButton.removeEventListener('click', onpictureCardCloseButtonClick);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
}

renderPictures(photoDescriptions);
pictures.addEventListener('click', onPictureClick);
