import { showPreview } from './pictures.js';

const filterContainer = document.querySelector('.img-filters');
let photos = [];

const filters = {
  'filter-default': (maxPicture) => showPreview(photos.slice(0, maxPicture)),

  'filter-random': (maxPicture) => showPreview(_.shuffle(photos.slice(0, maxPicture))),

  'filter-discussed': (maxPicture) =>
    showPreview(
      photos.slice(0, maxPicture).sort((a, b) => {
        return b.comments.length - a.comments.length;
      })
    ),
};

const pageWidth = document.documentElement.scrollWidth;
const SHOW_PREVIEW_MOBILE_WIDTH = photos.lengh;
const SHOW_PREVIEW_TABLET_WIDTH = 11;
const SHOW_PREVIEW_DESKTOP_WIDTH = 19;

const loadPictures = (filter) => {
  if (pageWidth > 1360) {
    filters[filter](SHOW_PREVIEW_DESKTOP_WIDTH);
  } else if (pageWidth < 1360 && pageWidth > 1024) {
    filters[filter](SHOW_PREVIEW_TABLET_WIDTH);
  } else if (pageWidth < 1024) {
    filters[filter](SHOW_PREVIEW_MOBILE_WIDTH);
  }
};

let onSuccess = (data) => {
  photos = data.slice();
  loadPictures('filter-default');
};

const removePhotos = () => {
  const images = document.querySelectorAll('.picture');
  if (images) {
    images.forEach((element) => {
      element.remove();
    });
  }
};

const onFilterClick = (evt) => {
  if (evt.target.classList.contains('img-filters__button')) {
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    removePhotos();
    evt.target.classList.add('img-filters__button--active');
    loadPictures(evt.target.id);
  }
};

filterContainer.addEventListener('click', onFilterClick);

export { onSuccess };
