import { createPhotoDescriptions } from './mock-data.js';

const renderPictures = () => {
  const photoDescriptions = createPhotoDescriptions();
  const picturesContainer = document.querySelector('.pictures');
  const pictureTemplateFragment = document.querySelector('#picture').content;
  const pictureTemplate = pictureTemplateFragment.querySelector('.picture');
  const picturesFragment = document.createDocumentFragment();

  for (const photoDescription of photoDescriptions) {
    const picture = pictureTemplate.cloneNode(true);
    const pictureImg = picture.querySelector('.picture__img');
    const pictureComments = picture.querySelector('.picture__comments');
    const pictureLikes = picture.querySelector('.picture__likes');

    pictureImg.src = photoDescription.url;
    pictureImg.alt = photoDescription.description;
    pictureComments.textContent = photoDescription.comments.length;
    pictureLikes.textContent = photoDescription.likes;

    picturesFragment.append(picture);
  }

  picturesContainer.append(picturesFragment);
};

export {renderPictures};
