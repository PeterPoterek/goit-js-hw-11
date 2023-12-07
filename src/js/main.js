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
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
      },
    });
    renderImages(res.data.hits);
  } catch (err) {
    console.log(err);
  }
};

const renderImages = images => {
  images.forEach(image => {
    const photoCard = document.createElement('div');
    photoCard.setAttribute('class', 'photo-card');

    const img = document.createElement('img');
    img.setAttribute('src', image.webformatURL);
    img.setAttribute('alt', image.tags);
    img.setAttribute('loading', 'lazy');

    const info = document.createElement('div');
    info.setAttribute('class', 'info');

    const likesLabel = document.createElement('p');
    likesLabel.setAttribute('class', 'info-item');
    const likesText = document.createElement('b');
    likesLabel.textContent = image.likes;
    likesText.textContent = 'Likes';
    likesLabel.append(likesText);

    const viewsLabel = document.createElement('p');
    viewsLabel.setAttribute('class', 'info-item');
    const viewsText = document.createElement('b');
    viewsLabel.textContent = image.views;
    viewsText.textContent = 'Views';
    viewsLabel.append(viewsText);

    const downloadsLabel = document.createElement('p');
    downloadsLabel.setAttribute('class', 'info-item');
    const downloadsText = document.createElement('b');
    downloadsLabel.textContent = image.downloads;
    downloadsText.textContent = 'Downloads';
    downloadsLabel.append(downloadsText);

    info.append(likesLabel, viewsLabel, downloadsLabel);

    photoCard.append(img, info);

    imagesToRender.push(photoCard);
  });
  console.log(images.length);

  gallery.append(...imagesToRender);
};
