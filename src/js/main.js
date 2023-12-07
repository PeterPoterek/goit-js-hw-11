import axios from 'axios';

const gallery = document.querySelector('#gallery');
const searchForm = document.querySelector('#search-form');

const handleSearch = e => {
  e.preventDefault();

  fetchPixabayAPI(e.target.searchQuery.value);
};
searchForm.addEventListener('submit', handleSearch);

const fetchPixabayAPI = async search => {
  const url = 'https://pixabay.com/api/';
  const apiKey = '41114633-51106070bf303d1c44ed5d4b9';

  try {
    const res = await axios.get(url, {
      params: {
        key: apiKey,
        q: search,
      },
    });
    // console.log(res.data.hits);
    renderImages(res.data.hits);
  } catch (err) {
    console.log(err);
  }
};

const renderImages = images => {
  images.forEach(image => {
    const img = document.createElement('img');
    img.setAttribute('src', image.webformatURL);

    gallery.append(img);
  });
};
