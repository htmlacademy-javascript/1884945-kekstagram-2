import {isEscapeKey} from './util.js';

const COMMENTS_TO_SHOW_VALUE = 5;
let renderedCommentsCounter = 0;
let commentElements = [];

const pictureCard = document.querySelector('.big-picture');
const pictureCardCloseButton = pictureCard.querySelector('.big-picture__cancel');
const pictureCardImg = pictureCard.querySelector('img');
const socialCaption = pictureCard.querySelector('.social__caption');
const likesCount = pictureCard.querySelector('.likes-count');
const shownCommentCount = pictureCard.querySelector('.social__comment-shown-count');
const totalCommentCount = pictureCard.querySelector('.social__comment-total-count');
const socialComments = pictureCard.querySelector('.social__comments');
const commentsLoader = pictureCard.querySelector('.social__comments-loader');

const isPicture = (evt) => evt.target.closest('.picture');

const onPictureClick = (photoDescriptions, evt) => {
  if (isPicture(evt)) {
    evt.preventDefault();
    renderPictureCard(evt, photoDescriptions);
    openPictureCard();
  }
};

const onPictureCardCloseButtonClick = () => {
  closePictureCard();
};

const onEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureCard();
  }
};

const onCommentsLoaderClick = () => {
  renderPortionOfComments();
};

const createCommentElements = ({comments}) => Array.from((comments), ({avatar, name, message}) =>
  `<li class="social__comment">
    <img
      class="social__picture"
      src=${avatar}
      alt=${name}
      width="35" height="35">
    <p class="social__text">${message}</p>
  </li>`
);

// function declaration для поднятия и возможности использования в функциях выше.

function renderPortionOfComments () {
  commentsLoader.classList.remove('hidden');
  commentElements
    .slice(renderedCommentsCounter, renderedCommentsCounter + COMMENTS_TO_SHOW_VALUE)
    .forEach((commentElement) => {
      socialComments.insertAdjacentHTML('beforeend', commentElement);
      renderedCommentsCounter++;
    });
  shownCommentCount.textContent = renderedCommentsCounter;
  if (renderedCommentsCounter >= commentElements.length) {
    commentsLoader.classList.add('hidden');
  }
}

function renderPictureCard (evt, photoDescriptions) {
  const currentPicture = photoDescriptions.find((picture) => picture.id === Number(evt.target.closest('.picture').id));

  pictureCardImg.src = currentPicture.url;
  socialCaption.textContent = currentPicture.description;
  likesCount.textContent = currentPicture.likes;
  totalCommentCount.textContent = currentPicture.comments.length;

  socialComments.replaceChildren();
  renderedCommentsCounter = 0;
  commentElements = createCommentElements(currentPicture);

  renderPortionOfComments();
}

function openPictureCard() {
  pictureCard.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onEscKeyDown);
  pictureCardCloseButton.addEventListener('click', onPictureCardCloseButtonClick);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
}

function closePictureCard() {
  pictureCard.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', onEscKeyDown);
  pictureCardCloseButton.removeEventListener('click', onPictureCardCloseButtonClick);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
}

export {onPictureClick};
