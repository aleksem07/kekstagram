import { request } from './fetch.js';
import { showSuccess, showError } from './alerts.js';

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

document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('img-upload__overlay')) {
    closeModal();
  }
});

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    closeModal();
  }
});

const preview = document.querySelector('.img-upload__preview img');

const resetFilters = () => {
  ControlValue.DEFAULT = 100;
  preview.attributes[0].nodeValue = 'none';
  preview.attributes.style.nodeValue = '';
  sliderContainer.classList.add('hidden');
  scaleControlValue.attributes[2].textContent = `${ControlValue.DEFAULT}%`;
  image.style.transform = `scale(${ControlValue.DEFAULT}%)`;
  scaleControlSmaller.disabled = false;
  scaleControlBigger.disabled = false;
  hashtagInput.value = '';
};

const uploadFile = document.querySelector('#upload-file');

uploadFile.addEventListener('change', () => {
  imgUploadContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  resetFilters();
});

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

const HashtagLength = {
  MIN: 2,
  MAX: 20,
};

const maxHashtags = 5;

const textContainer = document.querySelector('.img-upload__text');
const hashtagInput = textContainer.querySelector('.text__hashtags');
const commentInput = textContainer.querySelector('.text__description');

const space = /\s+/;
const splitHashtags = (stringToSplit, separator) => {
  return stringToSplit.split(separator);
};

hashtagInput.addEventListener('input', () => {
  hashtagInput.setCustomValidity('');

  let hashtagText = hashtagInput.value.toLowerCase().trim();

  if (!hashtagText) {
    return;
  }

  let hashtagsArray = splitHashtags(hashtagText, space);

  if (!hashtagsArray) {
    return;
  }

  for (const tag of hashtagsArray) {
    if (tag[0] !== '#') {
      hashtagInput.setCustomValidity('Хэштег должен начинаться с символа #');
    }
    if (hashtagsArray.length > maxHashtags) {
      hashtagInput.setCustomValidity('Нельзя указывать больше 5 хэш-тегов');
    }
    if (tag === '#') {
      hashtagInput.setCustomValidity('Хеш-тег не должен состоять только из одной решётки');
    }
    if (tag.indexOf('#', 1) >= 1) {
      hashtagInput.setCustomValidity('Хэш-теги должны разделяться пробелом');
    }
    if (hashtagText.length >= HashtagLength.MAX) {
      hashtagInput.setCustomValidity(`Максимальная длина ${HashtagLength.MAX} символов`);
    }
    if (hashtagText.length < HashtagLength.MIN) {
      hashtagInput.setCustomValidity(`Минимальная длина ${HashtagLength.MIN} символов`);
    }

    const unique = hashtagsArray.some((item, i, arr) => {
      return arr.indexOf(item, i + 1) >= i + 1;
    });

    if (unique) {
      hashtagInput.setCustomValidity('Хэш-теги не должны повторяться');
    }
  }

  hashtagInput.reportValidity();
});

// esc hashtag & comment----------------------------------------------------------------------------------------------------------
const onEscapeHashtag = (e) => {
  if (e.key === 'Escape' || e.key === 'Esc') {
    hashtagInput.value = '';
    e.preventDefault();
    e.stopPropagation();
  }
};

const onEscapeComment = (e) => {
  if (e.key === 'Escape' || e.key === 'Esc') {
    commentInput.value = '';
    e.preventDefault();
    e.stopPropagation();
  }
};

hashtagInput.addEventListener('keydown', onEscapeHashtag);
commentInput.addEventListener('keydown', onEscapeComment);

// send photo----------------------------------------------------------------------------------
const formSendButton = document.querySelector('.img-upload__form');

const onSuccess = () => {
  showSuccess('Изображение успешно загружено');
  closeModal();
  formSendButton.reset();
};

const onError = () => {
  closeModal();
  showError('Что-то пошло не так');
};

formSendButton.addEventListener('submit', (evt) => {
  evt.preventDefault();

  request(onSuccess, onError, 'POST', new FormData(evt.target));
});
