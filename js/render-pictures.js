const renderPictures = (photoDescriptions) => {
  const picturesContainer = document.querySelector('.pictures');
  const pictureTemplateFragment = document.querySelector('#picture').content;
  const pictureTemplate = pictureTemplateFragment.querySelector('.picture');
  const picturesFragment = document.createDocumentFragment();

  photoDescriptions.forEach(({url, description, comments, likes}) => {
    const picture = pictureTemplate.cloneNode(true);
    const pictureImg = picture.querySelector('.picture__img');
    const pictureComments = picture.querySelector('.picture__comments');
    const pictureLikes = picture.querySelector('.picture__likes');

    pictureImg.src = url;
    pictureImg.alt = description;
    pictureComments.textContent = comments.length;
    pictureLikes.textContent = likes;

    picturesFragment.append(picture);
  });

  picturesContainer.append(picturesFragment);
};

export {renderPictures};
