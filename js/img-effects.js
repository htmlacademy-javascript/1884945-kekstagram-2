const Effects = {
  'effect-none': {
    filter: 'none',
    min: 0,
    max: 0,
    step: 0,
    unit: '',
  },
  'effect-chrome': {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  'effect-sepia': {
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  'effect-marvin': {
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  'effect-phobos': {
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  'effect-heat': {
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
};

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview img');
const imgUploadEffectLevel = imgUploadForm.querySelector('.img-upload__effect-level');
const effectLevelInput = imgUploadEffectLevel.querySelector('.effect-level__value');
const effectLevelSlider = imgUploadEffectLevel.querySelector('.effect-level__slider');
const effectsList = imgUploadForm.querySelector('.effects__list');
const defaultEffect = Effects[effectsList.querySelector('input[type="radio"]:checked').id];

let currentEffect = defaultEffect;

const onEffectLevelSliderUpdate = () => {
  effectLevelInput.value = effectLevelSlider.noUiSlider.get();
  if (currentEffect === Effects['effect-none']) {
    imgUploadPreview.style.filter = `${currentEffect.filter}`;
  } else {
    imgUploadPreview.style.filter = `${currentEffect.filter}(${effectLevelInput.value}${currentEffect.unit})`;
  }
};

const onEffectsListChange = (evt) => {
  currentEffect = Effects[evt.target.id];
  if (currentEffect !== Effects['effect-none']) {
    imgUploadEffectLevel.classList.remove('visually-hidden');
  } else {
    imgUploadEffectLevel.classList.add('visually-hidden');
  }

  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    start: currentEffect.max,
    step: currentEffect.step,
  });
};

const addImgEffects = () => {
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    start: currentEffect.max,
    step: currentEffect.step,
    connect: 'lower',
    format: {
      to: (value) => {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: (value) => parseFloat(value),
    },
  });

  imgUploadEffectLevel.classList.add('visually-hidden');
  effectsList.addEventListener('change', onEffectsListChange);
  effectLevelSlider.noUiSlider.on('update', onEffectLevelSliderUpdate);
};

const removeImgEffects = () => {
  effectsList.removeEventListener('change', onEffectsListChange);
  effectLevelSlider.noUiSlider.destroy();
};

export {addImgEffects, removeImgEffects};
