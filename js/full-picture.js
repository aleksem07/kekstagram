import { renderComments, removeCommentItem } from './comment.js';
import { keyEsc } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

const bigPictureContainer = bigPicture.querySelector('.big-picture__preview');

removeCommentItem();

const openBigPicture = (picture) => {
  document.body.classList.add('modal-open');

  bigPictureContainer.querySelector('img').src = picture.url;
  bigPictureContainer.querySelector('img').alt = 'добавить описание alt';
  bigPictureContainer.querySelector('.likes-count').textContent = picture.likes;
  bigPictureContainer.querySelector('.social__caption').textContent = picture.description;
  bigPictureContainer.querySelector('.comments-count').textContent = picture.comments.length;

  bigPicture.classList.remove('hidden');

  renderComments(picture.comments);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  removeCommentItem();
};

bigPictureCloseButton.addEventListener('click', closeBigPicture);

document.addEventListener('keydown', (e) => {
  if (keyEsc) {
    closeBigPicture();
  }
});

export { openBigPicture };
