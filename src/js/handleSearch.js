import Notiflix from 'notiflix';

import {
  currentSearch,
  setCurrentSearch,
  currentPage,
  imagesPerPage,
  setImagesPerPage,
  setFirstFetch,
  setEndOfResults,
  resetCurrentPage,
} from './globalVariables.js';

import fetchPixaBayApi from './fetchPixaBayAPI.js';
import { renderImages } from './renderImages.js';

const gallery = document.querySelector('#gallery');

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const handleSearch = async e => {
  e.preventDefault();

  gallery.innerHTML = '';

  setImagesPerPage(40);
  setFirstFetch(true);
  setEndOfResults(false);
  resetCurrentPage();

  if (e.target.searchQuery.value !== '') {
    scrollToTop();
    setCurrentSearch(e.target.searchQuery.value);

    const data = await fetchPixaBayApi(
      currentSearch,
      currentPage,
      imagesPerPage
    );

    renderImages(data, true);
  } else {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
};

export default handleSearch;
