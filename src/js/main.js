import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('#gallery');
const searchForm = document.querySelector('#search-form');
const imagesToRender = [];

let firstFetch = false;

const handleSearch = e => {
  e.preventDefault();

  fetchPixabayAPI(e.target.searchQuery.value);
};
searchForm.addEventListener('submit', handleSearch);

const scrollToImages = () => {
  // if (firstFetch) {
  //   const { height: cardHeight } =
  //     gallery.firstElementChild.getBoundingClientRect();
  //   window.scrollBy({
  //     top: cardHeight * 2,
  //     behavior: 'smooth',
  //   });
  // }
};
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
    scrollToImages();
    firstFetch = true;
  } catch (err) {
    console.log(err);
  }
};
const renderImages = images => {
  const existingImages = document.querySelectorAll('.photo-card');
  const imagesToRender = [];

  images.forEach((image, index) => {
    const photoCard = existingImages[index] || document.createElement('div');
    photoCard.setAttribute('class', 'photo-card');

    const imgFull = photoCard.querySelector('a') || document.createElement('a');
    imgFull.setAttribute('href', image.largeImageURL);
    imgFull.setAttribute('loading', 'lazy');

    const imgSmall =
      photoCard.querySelector('img') || document.createElement('img');
    imgSmall.setAttribute('src', image.webformatURL);
    imgSmall.setAttribute('alt', image.tags);

    imgFull.innerHTML = '';
    imgFull.append(imgSmall);

    const info =
      photoCard.querySelector('.info') || document.createElement('div');
    info.setAttribute('class', 'info');

    const createInfoItem = (label, value) => {
      const labelElement = document.createElement('p');
      labelElement.setAttribute('class', 'info-item');
      const labelText = document.createElement('b');
      labelElement.textContent = value;
      labelText.textContent = label;
      labelElement.append(labelText);
      return labelElement;
    };

    const likesLabel = createInfoItem('Likes', image.likes);
    const viewsLabel = createInfoItem('Views', image.views);
    const downloadsLabel = createInfoItem('Downloads', image.downloads);

    info.innerHTML = '';
    info.append(likesLabel, viewsLabel, downloadsLabel);

    photoCard.innerHTML = '';
    photoCard.append(imgFull, info);

    imagesToRender.push(photoCard);
  });

  gallery.innerHTML = '';
  gallery.append(...imagesToRender);

  const lightbox = new SimpleLightbox('.gallery a');
};
