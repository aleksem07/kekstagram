import { getRandomNumber, getRandomNumberArray, makeUniqueRandomIntegerGenerator } from './util.js';

let message = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё. Не всё. Всё!',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Как можно было поймать такой неудачный момент?!',
  'Посмотрите мои работы, может научитесь фотографировать.',
  'Опять это?? Сколько можно?!',
  'Просто я высказываю свое мнение, а оно, внезапно, кому-то не нравится.',
  'Посмотрите, кто это у нас тут такой ранимый?',
  'И вот когда говоришь вам, что вы - дураки, вы считаете себя белыми и пушистыми, а меня - токсичным.',
  'Зачем это здесь?',
];

let nameCommentator = [
  'Лаврентий',
  'Аухади',
  'Симон',
  'Урбан',
  'Иори',
  'Ги',
  'Атабек',
  'Ормонд',
  'Хамза',
  'Лисбет',
  'Аурелия',
  'Эри',
  'Карина',
  'Ребека',
];

let surnameCommentator = [
  'Мамацашвили',
  'Уникян',
  'Жонсьер',
  'Камели',
  'Валлин',
  'Хелльберг',
  'Монкут',
  'Цюэ',
  'Масси',
  'Кастро',
  'Джутхани',
  'Уайт',
];

let descriptionPhotoAuthor = [
  'Классная фотка получилась, делюсь с вами',
  'Смотри - просто ВАУ!!!',
  'Фото наберет 1000 лайков! Вот увидите!!',
  'Красиво!',
  'Кажется, это мое лучшее фото',
  'Оцените! Буду рад любой критике',
  'Тут должна быть умная мысль',
  'На отдыхе, ёпта',
  'Люблю такие фото, хочется смотреть на них бесконечно',
  'Энни Лейбовиц подвинься, я новый Король!',
  'Зацени кадр на пленку',
];

const ID_AVATAR = {
  MIN: 1,
  MAX: 6,
};

const ID_COMMENT = {
  MIN: 1,
  MAX: 100,
};

const getUniqueRandomNumb = makeUniqueRandomIntegerGenerator(ID_COMMENT.MIN, ID_COMMENT.MAX);

const COMMENT_COUNT = {
  MIN: 1,
  MAX: 3,
};

let comments = () => {
  let comment = [];

  for (let i = 0; i < getRandomNumber(COMMENT_COUNT.MIN, COMMENT_COUNT.MAX); i++) {
    comment.push({
      id: getUniqueRandomNumb(),
      avatar: `img/avatar-${getRandomNumber(ID_AVATAR.MIN, ID_AVATAR.MAX)}.svg`,
      message: getRandomNumberArray(message),
      name: `${getRandomNumberArray(nameCommentator)} ${getRandomNumberArray(surnameCommentator)}`,
    });
  }

  return comment;
};

const PHOTO_COUNT = 25;

const LIKES = {
  MIN: 0,
  MAX: 200,
};

let photos = [];

let photoDescription = () => {
  for (let i = 0; i < PHOTO_COUNT; i++) {
    photos.push({
      id: i,
      url: `img/photos/${i + 1}.jpg`,
      description: getRandomNumberArray(descriptionPhotoAuthor),
      likes: getRandomNumber(LIKES.MIN, LIKES.MAX),
      comments: comments(),
    });
  }
};
photoDescription();

export { photos };
