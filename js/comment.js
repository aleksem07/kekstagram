import { photos } from './user-data.js';
import { getRandomNumber } from './util.js';

const removeCommentItem = () => {
  const bigPictureCommentList = document.querySelector('.social__comments');
  bigPictureCommentList.replaceChildren();
};

removeCommentItem();

const bigPictureCommentList = document.querySelector('.social__comments');

const createComment = () => {
  const bigPictureCommentItemTemplate = document
    .querySelector('#social__comment')
    .content.querySelector('.social__comment');
  const bigPictureCommentAdd = bigPictureCommentItemTemplate.cloneNode(true);
  bigPictureCommentList.appendChild(bigPictureCommentAdd);
  const socialText = bigPictureCommentList.querySelectorAll('.social__text');
  const socialPicture = bigPictureCommentList.querySelectorAll('.social__picture');

  socialPicture.forEach((item) => (item.src = photos[getRandomNumber(0, photos.length - 1)].comments[0].avatar));
  socialPicture.forEach((item) => (item.alt = photos[getRandomNumber(0, photos.length - 1)].comments[0].name));
  socialText.forEach((item) => (item.textContent = photos[getRandomNumber(0, photos.length - 1)].comments[0].message));
};

export { createComment, removeCommentItem };
