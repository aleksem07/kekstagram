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

// уникальное случайное целое число
const makeUniqueRandomIntegerGenerator = (min, max) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomNumber(min, max);
    if (previousValues.length >= max - min + 1) {
      throw new Error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }
    previousValues.push(currentValue);

    return currentValue;
  };
};

//проверка длины строки

const checksStringLength = (string, maxLenght) => {
  return string.length <= maxLenght;
};

checksStringLength('Строка', 140);

// keyCode

const Keys = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
  NUM_ESC: 27,
};

const keyEsc = () => {
  e.keyCode === Keys.NUM_ESC || e.key === Keys.ESC || e.key === Keys.ESCAPE;
};

export { getRandomNumber, getRandomNumberArray, makeUniqueRandomIntegerGenerator, keyEsc };
