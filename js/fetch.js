const URLs = {
  GET: 'https://23.javascript.pages.academy/kekstagram/data',
  POST: 'https://23.javascript.pages.academy/kekstagram',
};

const filterContainer = document.querySelector('.img-filters');

const request = (onSuccess, onError, method, data) => {
  fetch(URLs[method], {
    method: method,
    body: data,
  })
    .then((response) => response.json())
    .then((json) => {
      onSuccess(json);
    })
    .then(() => filterContainer.classList.remove('img-filters--inactive'))

    .catch(() => {
      onError();
    });
};

export { request };
