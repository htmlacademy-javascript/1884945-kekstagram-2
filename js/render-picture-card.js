import {photoDescriptions} from './mock-data.js';
const SHOWN_COMMENTS_VALUE = 5;

const pictureCard = document.querySelector('.big-picture');
const pictureCardImg = pictureCard.querySelector('img');
const socialCaption = pictureCard.querySelector('.social__caption');
const likesCount = pictureCard.querySelector('.likes-count');
const shownCommentCount = pictureCard.querySelector('.social__comment-shown-count');
const totalCommentCount = pictureCard.querySelector('.social__comment-total-count');
const socialComments = pictureCard.querySelector('.social__comments');
const commentsLoader = pictureCard.querySelector('.social__comments-loader');

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

const createCommentsRenderer = (commentElements) => {
  let currentCount = 0;
  commentsLoader.classList.remove('hidden');

  return () => {
    commentElements
      .slice(currentCount, currentCount + SHOWN_COMMENTS_VALUE)
      .forEach((commentElement) => {
        socialComments.insertAdjacentHTML('beforeend', commentElement);
        currentCount++;
      });
    shownCommentCount.textContent = currentCount;

    if (currentCount >= commentElements.length) {
      commentsLoader.classList.add('hidden');
    }
  };
};

let renderPortionOfComments;//Объявил отдельно, чтобы можно было экспортировать и удалять eventListener
// при закрытии полноразмерной картинки при нажатии на крестик или кнопку Esc.
// let вместо const чтобы eslint не выдавал ошибку: 'const' declarations must be initialized.
const renderPictureCard = (evt) => {
  const currentPicture = photoDescriptions.find((picture) => picture.id === Number(evt.target.closest('.picture').id));

  pictureCardImg.src = currentPicture.url;
  socialCaption.textContent = currentPicture.description;
  likesCount.textContent = currentPicture.likes;
  totalCommentCount.textContent = currentPicture.comments.length;

  socialComments.replaceChildren();
  renderPortionOfComments = createCommentsRenderer(createCommentElements(currentPicture));
  renderPortionOfComments();
};

export {renderPictureCard, commentsLoader, renderPortionOfComments};
