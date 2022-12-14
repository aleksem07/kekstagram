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

export { getRandomNumber, getRandomNumberArray };
