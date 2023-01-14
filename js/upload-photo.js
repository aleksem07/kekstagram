import { keyEsc } from './util.js';

const ControlValue = {
  DEFAULT: 100,
  MIN: 25,
  MAX: 200,
  STEP: 25,
};

const imgUploadContainer = document.querySelector('.img-upload__overlay');
const imgUploadClose = imgUploadContainer.querySelector('.img-upload__cancel');

const closeModal = () => {
  document.body.classList.remove('modal-open');
  imgUploadContainer.classList.add('hidden');
  uploadFile.value = '';
};

imgUploadClose.addEventListener('click', () => {
  closeModal();
});
// if (hashtag.value.trim().length !== 0) {
//   hashtag.value = '';}

document.addEventListener('keydown', (e) => {
  if (keyEsc) {
    closeModal();
  }
});

const resetFilters = () => {
  ControlValue.DEFAULT = 100;
  scaleControlValue.attributes[2].textContent = `${ControlValue.DEFAULT}%`;
  image.style.transform = `scale(${ControlValue.DEFAULT}%)`;
  scaleControlSmaller.disabled = false;
  scaleControlBigger.disabled = false;
  hashtag.value = '';
};

const uploadFile = document.querySelector('#upload-file');

uploadFile.addEventListener('change', () => {
  imgUploadContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  resetFilters();
});

// imgUploadContainer.classList.remove('hidden');
// document.body.classList.add('modal-open');

const scaleControlContainer = document.querySelector('.img-upload__scale');
const scaleControlSmaller = scaleControlContainer.querySelector('.scale__control--smaller');
const scaleControlValue = scaleControlContainer.querySelector('.scale__control--value');
const scaleControlBigger = scaleControlContainer.querySelector('.scale__control--bigger');

// scale-----------------------------------------------------------------------------------------------------------

scaleControlValue.attributes[2].textContent = ControlValue.DEFAULT + '%';

const photoZoom = (sign) => {
  if (sign) {
    ControlValue.DEFAULT += ControlValue.STEP;
  } else {
    ControlValue.DEFAULT -= ControlValue.STEP;
  }

  let scaleTransformValue = 'scale(' + ControlValue.DEFAULT / 100 + ')';

  scaleControlValue.attributes[2].textContent = ControlValue.DEFAULT + '%';
  image.style.transform = scaleTransformValue;

  if (ControlValue.DEFAULT <= ControlValue.MIN) {
    scaleControlSmaller.disabled = true;
  } else scaleControlSmaller.disabled = false;
  if (ControlValue.DEFAULT >= ControlValue.MAX) {
    scaleControlBigger.disabled = true;
  } else scaleControlBigger.disabled = false;
};

scaleControlSmaller.addEventListener('click', () => {
  photoZoom(false);
});

scaleControlBigger.addEventListener('click', () => {
  photoZoom(true);
});

const image = document.querySelector('.img-upload__preview img');
const imageContainer = document.querySelector('.img-upload__preview');
imageContainer.style.overflow = 'hidden';
const effectInput = document.querySelector('.effect-level__value');
// add effect --------------------------------------------------------------------------------------

const effectsList = document.querySelector('.effects__list');
const effectsItem = effectsList.querySelectorAll('.effects__item');
const effectsPreviewList = [
  'none',
  'effects__preview--chrome',
  'effects__preview--sepia',
  'effects__preview--marvin',
  'effects__preview--phobos',
  'effects__preview--heat',
];

const Effects = {
  NONE: () => {
    image.style.filter = '';
    sliderContainer.classList.add('hidden');
    effectInput.attributes[3].value = '';
  },
  CHROME: () => {
    sliderContainer.classList.remove('hidden');
    sliderContainer.noUiSlider.updateOptions({
      start: 1,
      range: {
        min: 0,
        max: 1,
      },
    });

    sliderContainer.noUiSlider.on('update', (value) => {
      imageContainer.querySelector('img').style.filter = `grayscale(${value})`;
      effectInput.attributes[3].value = value;
      // imageContainer.input = `grayscale(${value})`;
    });
  },
  SEPIA: () => {
    sliderContainer.classList.remove('hidden');
    sliderContainer.noUiSlider.updateOptions({
      start: 1,
      range: {
        min: 0,
        max: 1,
      },
    });

    sliderContainer.noUiSlider.on('update', (value) => {
      imageContainer.querySelector('img').style.filter = `sepia(${value})`;
      effectInput.attributes[3].value = value;
    });
  },
  MARVIN: () => {
    sliderContainer.classList.remove('hidden');
    sliderContainer.noUiSlider.updateOptions({
      start: 100,
      connect: [true, false],
      range: {
        min: 0,
        max: 100,
      },
    });

    sliderContainer.noUiSlider.on('update', (value) => {
      imageContainer.querySelector('img').style.filter = `invert(${value}%)`;
      effectInput.attributes[3].value = value;
    });
  },
  PHOBOS: () => {
    sliderContainer.classList.remove('hidden');
    sliderContainer.noUiSlider.updateOptions({
      start: 3,
      range: {
        min: 0,
        max: 10,
      },
    });

    sliderContainer.noUiSlider.on('update', (value) => {
      imageContainer.querySelector('img').style.filter = `blur(${value}px)`;
      effectInput.attributes[3].value = value;
    });
  },
  HEAT: () => {
    sliderContainer.classList.remove('hidden');
    sliderContainer.noUiSlider.updateOptions({
      start: 3,
      range: {
        min: 0,
        max: 5,
      },
    });

    sliderContainer.noUiSlider.on('update', (value) => {
      imageContainer.querySelector('img').style.filter = `brightness(${value})`;
      effectInput.attributes[3].value = value;
    });
  },
};

const sliderContainer = document.querySelector('.img-upload__effect-level ');
sliderContainer.classList.add('hidden');
noUiSlider.create(sliderContainer, {
  start: 100,
  connect: [true, false],
  range: {
    min: 0,
    max: 100,
  },
});

effectsItem.forEach((effect, i) => {
  effect.addEventListener('click', () => {
    effectsPreviewList.forEach((j) => {
      image.classList.remove(j);
    });
    image.classList.add(effectsPreviewList[i]);
    if (image.classList.contains(effectsPreviewList[0])) {
      Effects.NONE();
    }
    if (image.classList.contains(effectsPreviewList[1])) {
      Effects.CHROME();
    }
    if (image.classList.contains(effectsPreviewList[2])) {
      Effects.SEPIA();
    }
    if (image.classList.contains(effectsPreviewList[3])) {
      Effects.MARVIN();
    }
    if (image.classList.contains(effectsPreviewList[4])) {
      Effects.PHOBOS();
    }
    if (image.classList.contains(effectsPreviewList[5])) {
      Effects.HEAT();
    }
  });
});

// hashtag & comment-----------------------------------------------------------------------------------------------------------------------------

const textContainer = document.querySelector('.img-upload__text');
const hashtag = textContainer.querySelector('.text__hashtags');
// const description = textContainer.querySelector('.text__description');

const MIN_LENGTH_HASHTAGS = 2;
const MAX_LENGTH_HASHTAGS = 20;

hashtag.addEventListener('input', () => {
  const valueLength = hashtag.value.length;
  if (hashtag.value[0] !== '#') {
    hashtag.setCustomValidity('Хэштег должен начинаться с символа #');
  } else if (valueLength < MIN_LENGTH_HASHTAGS) {
    hashtag.setCustomValidity('Введите больше символов');
  } else if (valueLength > MAX_LENGTH_HASHTAGS) {
    hashtag.setCustomValidity('Введите меньше символов');
  } else {
    hashtag.setCustomValidity('');
  }

  hashtag.reportValidity();
});

// публикация -----------------------------------------------------------------------------------------------------------------------------------

const submitCommentButton = imgUploadContainer.querySelector('#upload-submit');
submitCommentButton.addEventListener('click', () => {
  document.querySelector('#upload-select-image').submit();
});
