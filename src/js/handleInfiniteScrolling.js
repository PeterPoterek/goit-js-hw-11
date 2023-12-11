import {
  currentSearch,
  setCurrentSearch,
  currentPage,
  imagesPerPage,
  setCurrentPage,
} from './globalVariables.js';

import fetchPixaBayApi from './fetchPixaBayAPI.js';
import { renderImages } from './renderImages.js';
const loadMoreButton = document.querySelector('.load-more');

const handleButtonClick = async () => {
  setCurrentPage(1);
  const data = await fetchPixaBayApi(currentSearch, currentPage, imagesPerPage);

  renderImages(data);
};
loadMoreButton.addEventListener('click', handleButtonClick);

const handleShowingLoadMoreNutton = () => {
  loadMoreButton.style.display = 'none';

  const observer = new IntersectionObserver(entries => {
    const lastPhotoCard = entries[0];
    if (!lastPhotoCard.isIntersecting) return;

    loadMoreButton.style.display = 'block';
  });

  observer.observe(document.querySelector('.photo-card:last-child'));
};

export { handleShowingLoadMoreNutton };
