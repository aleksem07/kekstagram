import { openBigPicture } from './full-picture.js';

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

const showPreview = (dataFetch) => {
  let picturesListFragment = document.createDocumentFragment();

  dataFetch.forEach((photo) => {
    picturesListFragment.appendChild(addPicture(photo));
  });

  picturesList.appendChild(picturesListFragment);
};

export { showPreview };
