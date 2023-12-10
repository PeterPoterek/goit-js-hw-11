import axios from 'axios';
import InfiniteScroll from 'infinite-scroll';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const gallery = document.querySelector('#gallery');
const searchForm = document.querySelector('#search-form');

const allImages = [];
const imagesPerPage = 40;
let currentPage = 1;
let totalFetchedImages = 0;
let imageToSearch = '';

const lightbox = new SimpleLightbox('.gallery a');

const fetchPixabayAPI = async (search, currentPage) => {
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
        page: currentPage,
        per_page: imagesPerPage,
      },
    });
    totalFetchedImages += res.data.hits.length;

    if (totalFetchedImages > 500) {
      return [];
    }

    return res.data.hits;
  } catch (err) {
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );

    return [];
  }
};

const createInfoItem = (label, value) => {
  const labelElement = document.createElement('p');
  labelElement.setAttribute('class', 'info-item');
  const labelText = document.createElement('b');
  labelElement.textContent = value;
  labelText.textContent = label;
  labelElement.append(labelText);
  return labelElement;
};

const createPhotoCard = image => {
  const photoCard = document.createElement('div');
  photoCard.setAttribute('class', 'photo-card');

  const imgFull = document.createElement('a');
  imgFull.setAttribute('href', image.largeImageURL);
  imgFull.setAttribute('loading', 'lazy');

  const imgSmall = document.createElement('img');
  imgSmall.setAttribute('src', image.webformatURL);
  imgSmall.setAttribute('alt', image.tags);

  imgFull.appendChild(imgSmall);

  const info = document.createElement('div');
  info.setAttribute('class', 'info');

  const likesLabel = createInfoItem('Likes', image.likes);
  const viewsLabel = createInfoItem('Views', image.views);
  const downloadsLabel = createInfoItem('Downloads', image.downloads);

  info.append(likesLabel, viewsLabel, downloadsLabel);

  photoCard.append(imgFull);
  photoCard.append(info);

  return photoCard;
};

const renderImages = data => {
  if (!data) return;

  const imagesToRender = data.map(createPhotoCard);
  gallery.append(...imagesToRender);

  lightbox.refresh();
};

const handleSearch = async e => {
  e.preventDefault();
  totalFetchedImages = 0;
  currentPage = 1;

  if (e.target.searchQuery.value !== '') {
    imageToSearch = e.target.searchQuery.value;
    const images = await fetchPixabayAPI(imageToSearch, currentPage);
    renderImages(images);
    handleInfiniteScroll();
  } else {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
};

searchForm.addEventListener('submit', handleSearch);

const handleInfiniteScroll = () => {
  const infiniteScroll = new InfiniteScroll('#gallery', {
    path: () => `?page=${currentPage + 1}`,
    append: '.photo-card',
    history: false,
  });

  infiniteScroll.on('load', async () => {
    currentPage += 1;
    const newImages = await fetchPixabayAPI(imageToSearch, currentPage);
    if (newImages.length > 0) {
      renderImages(newImages);
    } else {
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      infiniteScroll.off('load');
    }
  });
};
