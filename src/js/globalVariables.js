let currentPage;
let imagesPerPage;
let currentSearch;
let firstFetch;
let endOfResults;
let totalImages;

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

const setTotalImages = value => {
  totalImages = value;
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
  totalImages,
  setTotalImages,
};

setInterval(() => {
  console.log(endOfResults);
}, 2000);
