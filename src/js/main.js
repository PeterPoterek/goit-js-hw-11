import axios from 'axios';

const gallery = document.querySelector('#gallery');
const searchForm = document.querySelector('#search-form');
const imagesToRender = [];
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
    console.log(image);

    const photoCard = document.createElement('div');
    photoCard.setAttribute('class', 'photo-card');

    const img = document.createElement('img');
    img.setAttribute('src', image.webformatURL);
    img.setAttribute('alt', 'Image');
    img.setAttribute('loading', 'lazy');

    const info = document.createElement('div');
    info.setAttribute('class', 'info');

    const likes = document.createElement('p');
    likes.setAttribute('class', 'info-item');

    const views = document.createElement('p');
    views.setAttribute('class', 'info-item');

    const downloads = document.createElement('p');
    downloads.setAttribute('class', 'info-item');

    info.append(likes, views, downloads);

    photoCard.append(img, info);

    imagesToRender.push(photoCard);
  });

  gallery.append(...imagesToRender);
};
