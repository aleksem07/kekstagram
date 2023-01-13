const imgUploadContainer = document.querySelector('.img-upload__overlay');
const imgUploadClose = imgUploadContainer.querySelector('.img-upload__cancel');

imgUploadClose.addEventListener('click', () => {
  imgUploadContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

document.addEventListener('keydown', (e) => {
  if (e.keyCode === 27) {
    imgUploadContainer.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});

const uploadFile = document.querySelector('#upload-file');

uploadFile.addEventListener('change', () => {
  imgUploadContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

imgUploadContainer.classList.remove('hidden');
document.body.classList.add('modal-open');

const scaleControlContainer = document.querySelector('.img-upload__scale');
const scaleControlSmaller = scaleControlContainer.querySelector('.scale__control--smaller');
const scaleControlValue = scaleControlContainer.querySelector('.scale__control--value');
const scaleControlBigger = scaleControlContainer.querySelector('.scale__control--bigger');

// scale-----------------------------------------------------------------------------------------------------------

let controlValueDefault = 100;
scaleControlValue.attributes[2].textContent = controlValueDefault + '%';

const controlValueMin = 25;
const controlValueMax = 200;
const controlValueStep = 25;

const photoZoom = (sign, value) => {
  if (sign) {
    controlValueDefault += controlValueStep;
  } else {
    controlValueDefault -= controlValueStep;
  }

  let scaleTransformValue = 'scale(' + controlValueDefault / 100 + ')';

  scaleControlValue.attributes[2].textContent = controlValueDefault + '%';
  image.style.transform = scaleTransformValue;

  if (controlValueDefault <= controlValueMin) {
    scaleControlSmaller.disabled = true;
  } else scaleControlSmaller.disabled = false;
  if (controlValueDefault >= controlValueMax) {
    scaleControlBigger.disabled = true;
  } else scaleControlBigger.disabled = false;
};

scaleControlSmaller.addEventListener('click', () => {
  photoZoom(false, controlValueMin);
});

scaleControlBigger.addEventListener('click', () => {
  photoZoom(true, controlValueMax);
});

const image = document.querySelector('.img-upload__preview img');
document.querySelector('.img-upload__preview').style.overflow = 'hidden';

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

const sliderContainer = document.querySelector('.img-upload__effect-level ');

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
      image.style.filter = '';
      // sliderContainer.classList.add('hidden');
    }
    if (image.classList.contains(effectsPreviewList[1])) {
      sliderContainer.noUiSlider.updateOptions({
        start: 1,
        range: {
          min: 0,
          max: 1,
        },
      });

      sliderContainer.noUiSlider.on('update', (value) => {
        document.querySelector('.' + effectsPreviewList[1]).style.filter = `grayscale(${value})`;
      });
    }
    if (image.classList.contains(effectsPreviewList[2])) {
      sliderContainer.noUiSlider.updateOptions({
        start: 1,
        range: {
          min: 0,
          max: 1,
        },
      });

      sliderContainer.noUiSlider.on('update', (value) => {
        document.querySelector('.' + effectsPreviewList[2]).style.filter = `sepia(${value})`;
      });
    }
    if (image.classList.contains(effectsPreviewList[3])) {
      sliderContainer.noUiSlider.updateOptions({
        start: 100,
        connect: [true, false],
        range: {
          min: 0,
          max: 100,
        },
      });

      sliderContainer.noUiSlider.on('update', (value) => {
        document.querySelector('.effects__preview--marvin').style.filter = `invert(${value}%)`;
      });
    }
    if (image.classList.contains(effectsPreviewList[4])) {
      sliderContainer.noUiSlider.updateOptions({
        start: 3,
        range: {
          min: 0,
          max: 10,
        },
      });

      sliderContainer.noUiSlider.on('update', (value) => {
        document.querySelector('.' + effectsPreviewList[4]).style.filter = `blur(${value}px)`;
      });
    }
    if (image.classList.contains(effectsPreviewList[5])) {
      sliderContainer.noUiSlider.updateOptions({
        start: 3,
        range: {
          min: 0,
          max: 5,
        },
      });

      sliderContainer.noUiSlider.on('update', (value) => {
        document.querySelector('.' + effectsPreviewList[5]).style.filter = `brightness(${value})`;
      });
    }
  });
});

// hashtag & comment-----------------------------------------------------------------------------------------------------------------------------

const textContainer = document.querySelector('.img-upload__text');
const hashtag = textContainer.querySelector('.text__hashtags');
const description = textContainer.querySelector('.text__description');

hashtag.value[0] === '#';
console.log(hashtag.value[0]);

// публикация -----------------------------------------------------------------------------------------------------------------------------------
// import { openBigPicture } from './full-picture';

// const submitCommentButton = imgUploadContainer.querySelector('#upload-submit');
// console.log(openBigPicture(photos));
