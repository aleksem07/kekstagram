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

let controlValueDefault = 0;
scaleControlValue.attributes[2].textContent = controlValueDefault + '%';

const controlValueMin = 50;
const controlValueMax = 100;
const controlValueStep = 10;

const photoZoom = (sign, value) => {
  if (sign) {
    controlValueDefault += controlValueStep;
  } else {
    controlValueDefault -= controlValueStep;
  }

  let scaleTransformValue = 'scale(' + '1.' + controlValueDefault + ')';

  scaleControlValue.attributes[2].textContent = controlValueDefault + '%';
  image.style.transform = scaleTransformValue;

  // if (controlValueDefault <= value) {
  //   controlValueDefault = value;
  //   scaleControlValue.attributes[2].textContent = value + '%';
  //   image.querySelector('.img-upload__preview img').style.transform = scaleTransformValue;
  // } else if (controlValueDefault >= value) {
  //   controlValueDefault = value;
  //   scaleTransformValue = 'scale(2)';
  //   scaleControlValue.attributes[2].textContent = value + '%';
  //   image.querySelector('.img-upload__preview img').style.transform = scaleTransformValue;
  // }
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

effectsItem.forEach((effect, i) => {
  effect.addEventListener('click', () => {
    effectsPreviewList.forEach((j) => {
      image.classList.remove(j);
    });
    image.classList.add(effectsPreviewList[i]);
  });
});

const sliderContainer = document.querySelector('.img-upload__effect-level ');

noUiSlider.create(sliderContainer, {
  start: 50,
  connect: [true, false],
  range: {
    min: 0,
    max: 100,
  },
});

if (image.classList.contains('none')) {
  sliderContainer.noUiSlider.destroy();
}

console.log(image.classList.contains('none'));
