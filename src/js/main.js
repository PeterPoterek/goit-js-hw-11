import handleSearch from './handleSearch.js';

const searchForm = document.querySelector('#search-form');

searchForm.addEventListener('submit', handleSearch);
