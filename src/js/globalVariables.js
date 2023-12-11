let currentPage = 1;
let imagesPerPage = 40;
let currentSearch = '';
let firstFetch = true;
let endOfResults = false;
const setCurrentSearch = newSearch => {
  currentSearch = newSearch;
};

const setCurrentPage = page => {
  currentPage = currentPage + page;
};
const resetCurrentPage = () => {
  currentPage = 1;
};

const setFirstFetch = bool => {
  firstFetch = bool;
};

const setEndOfResults = bool => {
  endOfResults = bool;
};

export {
  currentPage,
  imagesPerPage,
  currentSearch,
  setCurrentSearch,
  setCurrentPage,
  firstFetch,
  setFirstFetch,
  endOfResults,
  setEndOfResults,
  resetCurrentPage,
};
