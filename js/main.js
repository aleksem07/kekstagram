import { message, nameCommentator, surnameCommentator } from './user-data.js';
import { descriptionPhotoAuthor } from './user-data.js';

// случайное целое число
const getRandomNumber = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }
  if (max <= min) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// случайное целое число из массива
const getRandomNumberArray = (array) => {
  return array[getRandomNumber(0, array.length - 1)];
};

//проверка длины строки

const checksStringLength = (string, maxLenght) => {
  return string.length <= maxLenght;
};

checksStringLength('Строка', 140);

// объект заполнение фото

// let fillingPhoto = {
//   id: getRandomNumber(1, 25), // должны быть уникальны
//   url: `img/photos/${getRandomNumber(1, 25)}.jpg`, // должны быть уникальны
//   description: 'описание придумать',
//   likes: getRandomNumber(15, 200),
//   comments: {
//     id: getRandomNumber(1, 1000), // должны быть уникальны
//     // avatar: `img/avatar-${getRandomNumber(1, 6)}.jpg`,
//     message: message[getRandomNumber(0, message.length - 1)],
//     name: `${nameCommentator[getRandomNumber(0, nameCommentator.length - 1)]} ${
//       surnameCommentator[getRandomNumber(0, surnameCommentator.length - 1)]
//     }`,
//   },
// };

const PHOTO_COUNT = 25;

const LIKES = {
  MIN: 0,
  MAX: 200,
};

// const ID_COMMENT = {
//   MIN: 0,
//   MAX: 1000,
// };

const ID_AVATAR = {
  MIN: 1,
  MAX: 6,
};

const COMMENT_COUNT = {
  MIN: 1,
  MAX: 3,
};

let comments = () => {
  let comment = [];

  for (let i = 0; i < getRandomNumber(COMMENT_COUNT.MIN, COMMENT_COUNT.MAX); i++) {
    comment.push({
      id: i + 1, // добавить имя фото
      avatar: `'img/avatar-${getRandomNumber(ID_AVATAR.MIN, ID_AVATAR.MAX)}.jpg'`,
      message: getRandomNumberArray(message),
      name: getRandomNumberArray(nameCommentator) + ' ' + getRandomNumberArray(surnameCommentator),
    });
  }
  return comment;
};

let photoDescription = () => {
  const photos = [];

  for (let i = 0; i < PHOTO_COUNT; i++) {
    photos.push({
      id: i,
      url: `'img/photos/${i + 1}.jpg'`,
      description: getRandomNumberArray(descriptionPhotoAuthor),
      likes: getRandomNumber(LIKES.MIN, LIKES.MAX),
      comments: comments(),
    });
  }

  return photos;
};
photoDescription();
// console.log(fillingPhoto);
// console.log(fillingPhoto.comments);
// console.log(photoDescription());
