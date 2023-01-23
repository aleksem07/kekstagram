const removeAlert = (type) => {
  document.querySelector(type).remove();
};

const successTemplate = document.querySelector('#success').content;
const successFragment = document.createDocumentFragment();

const showSuccess = (text) => {
  const successElement = successTemplate.cloneNode(true);

  successElement.querySelector('.success__title').textContent = text;

  const successButton = successElement.querySelector('.success__button');

  successFragment.appendChild(successElement);
  document.querySelector('main').appendChild(successFragment);

  successButton.addEventListener('click', () => {
    removeAlert('.success');
  });
};

const errorTemplate = document.querySelector('#error').content;
const errorFragment = document.createDocumentFragment();

const showError = (text) => {
  const errorElement = errorTemplate.cloneNode(true);

  errorElement.querySelector('.error__title').textContent = text;

  const errorButton = errorElement.querySelector('.error__button');

  errorFragment.appendChild(errorElement);
  document.querySelector('main').appendChild(errorFragment);

  errorButton.addEventListener('click', () => {
    removeAlert('.error');
  });
};

export { showSuccess, showError };
