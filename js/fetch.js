const URLs = {
  GET: 'https://23.javascript.pages.academy/kekstagram/data',
  POST: 'https://23.javascript.pages.academy/kekstagram',
};

const request = (onSuccess, onError, method, data) => {
  fetch(URLs[method], {
    method: method,
    body: data,
  })
    .then((response) => response.json())
    .then((json) => {
      onSuccess(json);
    })

    .catch(() => {
      onError();
    });
};

export { request };
