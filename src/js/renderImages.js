import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { handleShowingLoadMoreNutton } from './handleInfiniteScrolling.js';

import { firstFetch, endOfResults } from './globalVariables.js';

const gallery = document.querySelector('#gallery');
const imagesToRender = [];
const lightbox = new SimpleLightbox('.gallery a');

const createInfoItem = (label, value) => {
  const labelElement = document.createElement('p');
  labelElement.setAttribute('class', 'info-item');
  const labelText = document.createElement('b');
  labelElement.textContent = value;
  labelText.textContent = label;
  labelElement.append(labelText);
  return labelElement;
};

const renderImages = (data, renderFlag = false) => {
  if (endOfResults) return;

  if (renderFlag) {
    gallery.innerHTML = '';
    imagesToRender.length = 0;
  }

  data.forEach(image => {
    const photoCard = document.createElement('div');
    photoCard.classList.add('photo-card');

    const imgFull = document.createElement('a');
    imgFull.setAttribute('href', image.largeImageURL);
    imgFull.setAttribute('loading', 'lazy');

    const imgSmall = document.createElement('img');
    imgSmall.setAttribute('src', image.webformatURL);
    imgSmall.setAttribute('alt', image.tags);

    imgFull.append(imgSmall);

    const info = document.createElement('div');
    info.classList.add('info');

    const likesLabel = createInfoItem('Likes', image.likes);
    const viewsLabel = createInfoItem('Views', image.views);
    const downloadsLabel = createInfoItem('Downloads', image.downloads);

    info.append(likesLabel, viewsLabel, downloadsLabel);

    photoCard.append(imgFull, info);

    imagesToRender.push(photoCard);
  });

  gallery.append(...imagesToRender);
  lightbox.refresh();
  handleShowingLoadMoreNutton();
};

export { renderImages };
