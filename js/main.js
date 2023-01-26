import './upload-photo.js';
import './upload-preview.js';
import { request } from './fetch.js';
import { showPreview } from './pictures.js';
import { showError } from './alerts.js';

const onSuccess = (data) => {
  showPreview(data.slice());
};

const onError = () => {
  showError('Ошибка загрузки, попробуйте позже');
};

request(onSuccess, onError, 'GET');
