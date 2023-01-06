import { photos } from './user-data.js';
import { makeUniqueRandomIntegerGenerator } from './util.js';

const picturesList = document.querySelector('.pictures');
const picture = document.querySelector('#picture').content.querySelector('.picture');

const likes = picture.querySelector('.picture__likes');
const img = picture.querySelector('.picture__img');
const comments = picture.querySelector('.picture__comments');

const addPicture = function (item) {
  likes.textContent = item.likes;
  img.src = item.url;
  comments.textContent = item.comments.length;
  const pictureAdd = picture.cloneNode(true);
  picturesList.appendChild(pictureAdd);
};

const getUniqueRaindomNumb = makeUniqueRandomIntegerGenerator(0, photos.length - 1);

const displayedPhotoCount = 12;

const showPreview = function () {
  for (let i = 0; i < displayedPhotoCount; i++) {
    addPicture(photos[getUniqueRaindomNumb()]);
  }
};

export { showPreview };
