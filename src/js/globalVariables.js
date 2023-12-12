let currentPage;
let imagesPerPage;
let currentSearch;
let firstFetch;
let endOfResults;

const setCurrentSearch = newSearch => {
  currentSearch = newSearch;
};

const setImagesPerPage = count => {
  imagesPerPage = count;
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
  setImagesPerPage,
  currentSearch,
  setCurrentSearch,
  setCurrentPage,
  firstFetch,
  setFirstFetch,
  endOfResults,
  setEndOfResults,
  resetCurrentPage,
};

setInterval(() => {
  console.log(currentPage, 'currentPage');
  console.log(imagesPerPage, 'imagesPerPage');
  console.log(currentSearch, 'currentSearch');
  console.log(firstFetch, 'firstFetch');
  console.log(endOfResults, 'endOfResults');
}, 1000);
