import Notiflix from 'notiflix';

import {
  currentSearch,
  setCurrentSearch,
  currentPage,
  imagesPerPage,
  setCurrentPage,
  endOfResults,
  setEndOfResults,
  totalImages,
} from './globalVariables.js';

import fetchPixaBayApi from './fetchPixaBayAPI.js';
import { renderImages } from './renderImages.js';

const gallery = document.querySelector('#gallery');

const loadMoreButton = document.querySelector('.load-more');

const scrollToImage = () => {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};

const handleButtonClick = async () => {
  if (gallery.childNodes.length >= 40) {
    setCurrentPage(1);
  }
  const data = await fetchPixaBayApi(currentSearch, currentPage, imagesPerPage);

  renderImages(data);
  scrollToImage();
};
loadMoreButton.addEventListener('click', handleButtonClick);

const handleShowingLoadMoreNutton = () => {
  if (gallery.childNodes.length === 0 || endOfResults) return;

  loadMoreButton.style.display = 'none';

  const observer = new IntersectionObserver(entries => {
    const lastPhotoCard = entries[0];
    if (!lastPhotoCard.isIntersecting) return;

    if (!endOfResults) {
      loadMoreButton.style.display = 'block';
    }

    if (gallery.childNodes.length >= totalImages && endOfResults === false) {
      setEndOfResults(true);
      loadMoreButton.style.display = 'none';
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
  });

  observer.observe(document.querySelector('.photo-card:last-child'));
};

export { handleShowingLoadMoreNutton };
