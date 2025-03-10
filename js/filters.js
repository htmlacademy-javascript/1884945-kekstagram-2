import { shuffleArray, debounce } from './util.js';
import { renderPictures } from './render-pictures.js';

const Filters = {
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const RANDOM_PHOTO_DESCRIPTIONS_COUNT = 10;

const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');
let activeButton = imgFiltersForm.querySelector('.img-filters__button--active');

const isImgFiltersButton = (evt) =>
  evt.target.classList.contains('img-filters__button');

const selectActiveButton = (evt) => {
  activeButton.classList.remove('img-filters__button--active');
  activeButton = evt.target;
  activeButton.classList.add('img-filters__button--active');
};

const compareByNumberOfComments = (commentA, commentB) =>
  commentB['comments'].length - commentA['comments'].length;

const sortByDefault = (photoDescriptions) => photoDescriptions;

const sortByComments = (photoDescriptions) => photoDescriptions.slice().sort(compareByNumberOfComments);

const sortRandomly = (photoDescriptions) =>
  shuffleArray(photoDescriptions.slice()).slice(-RANDOM_PHOTO_DESCRIPTIONS_COUNT);

const getSortedPhotoDescriptions = (photoDescriptions) => {
  switch (activeButton.id) {
    case Filters.RANDOM:
      return sortRandomly(photoDescriptions);
    case Filters.DISCUSSED:
      return sortByComments(photoDescriptions);
    default:
      return sortByDefault(photoDescriptions);
  }
};

const clearGallery = () => {
  document.querySelectorAll('.picture').forEach((picture) => picture.remove());
};

const debouncedclearGallery = debounce(clearGallery);
const debouncedRenderPictures = debounce(renderPictures);

const initFilters = (photoDescriptions) => {
  const onImgFiltersButtonClick = (evt) => {
    if (!isImgFiltersButton(evt)) {
      return;
    }

    if (evt.target.id !== activeButton.id) {
      selectActiveButton(evt);
      const sortedPhotoDescriptions = getSortedPhotoDescriptions(photoDescriptions);
      debouncedclearGallery();
      debouncedRenderPictures(sortedPhotoDescriptions);
    }
  };

  imgFilters.classList.remove('img-filters--inactive');
  imgFiltersForm.addEventListener('click', onImgFiltersButtonClick);
};

export { initFilters };
