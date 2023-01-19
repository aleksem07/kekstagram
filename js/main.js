import './upload-photo.js';
import { showPreview } from './pictures.js';

const onSuccess = (data) => {
  showPreview(data.slice());
};

const onError = () => {
  console.log('Ошибка загрузки, попробуйте позже', 'Закрыть');
};

fetch('https://23.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((json) => {
    onSuccess(json);
  })
  .catch(() => {
    onError();
  });
