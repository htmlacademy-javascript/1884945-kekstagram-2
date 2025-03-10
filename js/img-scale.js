const ScaleValues = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const imgUploadForm = document.querySelector('.img-upload__form');
const scaleControlSmaller = imgUploadForm.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadForm.querySelector('.scale__control--bigger');
const scaleControlInput = imgUploadForm.querySelector('.scale__control--value');
const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview img');

const scaleImg = (value) => {
  imgUploadPreview.style.transform = `scale(${value / 100})`;
  scaleControlInput.value = `${value}%`;
};

const onScaleControlSmallerClick = () => {
  const currentValue = parseInt(scaleControlInput.value, 10);
  let newValue = currentValue - ScaleValues.STEP;
  if (newValue < ScaleValues.MIN) {
    newValue = ScaleValues.MIN;
  }
  scaleImg(newValue);
};

const onScaleControlBiggerClick = () => {
  const currentValue = parseInt(scaleControlInput.value, 10);
  let newValue = currentValue + ScaleValues.STEP;
  if (newValue > ScaleValues.MAX) {
    newValue = ScaleValues.MAX;
  }
  scaleImg(newValue);
};

const addScale = () => {
  scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);
};

const resetScale = () => {
  scaleImg(parseInt(scaleControlInput.getAttribute('value'), 10));
  scaleControlSmaller.removeEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.removeEventListener('click', onScaleControlBiggerClick);
};

export { addScale, resetScale };
