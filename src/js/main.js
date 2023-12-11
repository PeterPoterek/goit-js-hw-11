import SimpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';

import fetchPixaBayApi from './fetchPixaBayAPI.js';
import handleSearch from './handleSearch.js';
import handleInfiniteScroll from './handleInfiniteScrolling.js';

const searchForm = document.querySelector('#search-form');

searchForm.addEventListener('submit', handleSearch);
handleInfiniteScroll();
