import { photos } from './user-data.js';
import { openBigPicture } from './full-picture.js';
import { makeUniqueRandomIntegerGenerator } from './util.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const addPicture = (item) => {
  const pictureAdd = pictureTemplate.cloneNode(true);

  pictureAdd.querySelector('.picture__img').src = item.url;
  pictureAdd.querySelector('.picture__img').alt = 'добавить alt';
  pictureAdd.querySelector('.picture__likes').textContent = item.likes;
  pictureAdd.querySelector('.picture__comments').textContent = item.comments.length;

  pictureAdd.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(item);
  });

  return pictureAdd;
};

const showPreview = function () {
  let picturesListFragment = document.createDocumentFragment();

  const getUniqueRaindomNumb = makeUniqueRandomIntegerGenerator(0, photos.length - 1);

  const displayedPhotoCount = 12;

  for (let i = 0; i < displayedPhotoCount; i++) {
    picturesListFragment.appendChild(addPicture(photos[getUniqueRaindomNumb()]));
  }

  picturesList.appendChild(picturesListFragment);
};

export { showPreview };
