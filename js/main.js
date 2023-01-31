import './upload-photo.js';
import './upload-preview.js';
import './view-filter.js';
import { onSuccess } from './view-filter.js';
import { showError } from './alerts.js';
import { request } from './fetch.js';

const onError = () => {
  showError('Ошибка загрузки, попробуйте позже');
};

request(onSuccess, onError, 'GET');
