import { photos } from './user-data.js';
import { getRandomNumber } from './util.js';
import { createComment, removeCommentItem } from './comment.js';

const picturePreview = document.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const bigPictureContainer = bigPicture.querySelector('.big-picture__preview');
const bigPictureImg = bigPictureContainer.querySelector('img');
const bigPictureLikesCount = bigPictureContainer.querySelector('.likes-count');
const bigPictureDescription = bigPictureContainer.querySelector('.social__caption');

const hideTemporarily = () => {
  const commentLoader = bigPictureContainer.querySelector('.comments-loader');
  commentLoader.classList.add('hidden');
  const bigPictureLikesCommentsCount = bigPictureContainer.querySelector('.social__comment-count');
  bigPictureLikesCommentsCount.classList.add('hidden');
};

const openBigPicture = () => {
  picturePreview.forEach((pic) => {
    pic.addEventListener('click', function () {
      bigPicture.classList.remove('hidden');
      document.body.classList.add('modal-open');

      bigPictureImg.src = pic.childNodes[1].attributes[1].nodeValue;
      bigPictureImg.alt = pic.childNodes[1].attributes[4].nodeValue;
      bigPictureLikesCount.textContent = pic.childNodes[3].childNodes[3].innerText;

      bigPictureDescription.textContent = photos[getRandomNumber(0, photos.length - 1)].description;

      hideTemporarily();

      let commentCount = pic.childNodes[3].childNodes[1].innerText;

      for (let i = 0; i < pic.childNodes[3].childNodes[1].innerText; i++) {
        createComment();
      }
    });
  });
};

openBigPicture();

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  removeCommentItem();
};

bigPictureCloseButton.addEventListener('click', function () {
  closeBigPicture();
});

document.addEventListener('keydown', function (e) {
  if (e.keyCode === 27) {
    closeBigPicture();
  }
});
