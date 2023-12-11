let currentPage = 1;
let imagesPerPage = 40;
let currentSearch = '';

const setCurrentSearch = newSearch => {
  currentSearch = newSearch;
};

const setCurrentPage = page => {
  currentPage = currentPage + page;
};

export {
  currentPage,
  imagesPerPage,
  currentSearch,
  setCurrentSearch,
  setCurrentPage,
};
