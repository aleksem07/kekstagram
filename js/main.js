// случайное целое число
const givesBackRandomNumber = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }
  if (max <= min) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
givesBackRandomNumber(0, 10);

// длина строки

const checksStringLength = (string, maxLenght) => {
  return string.length <= maxLenght;
};

checksStringLength('Строка', 140);
