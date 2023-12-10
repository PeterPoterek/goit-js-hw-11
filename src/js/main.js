import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const gallery = document.querySelector('#gallery');
const searchForm = document.querySelector('#search-form');

const imagesPerPage = 40;
let firstFetchFlag = false;
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

    firstFetchFlag = true;

    return res.data.hits;
  } catch (err) {
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );

    return [];
  }
};

const handleScroll = () => {
  if (!firstFetchFlag) return;

  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
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

const renderImages = async data => {
  if (!data) return;

  const images = await data;
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

  lightbox.refresh();
};

const handleSearch = async e => {
  e.preventDefault();

  if (e.target.searchQuery.value !== '') {
    handleScroll();
    imageToSearch = e.target.searchQuery.value;
    const images = fetchPixabayAPI(imageToSearch, currentPage);

    await renderImages(images);
    handleInfiniteScroll();
  } else {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
};
searchForm.addEventListener('submit', handleSearch);

const renderMoreImages = async data => {
  if (totalFetchedImages > 500) return;

  if (!data) return;

  currentPage += 1;
  const imagesToRender = [];
  data.forEach(image => {
    const photoCard = document.createElement('div');
    photoCard.setAttribute('class', 'photo-card');

    const imgFull = document.createElement('a');
    imgFull.setAttribute('href', image.largeImageURL);

    const imgSmall = document.createElement('img');
    imgSmall.setAttribute('src', image.webformatURL);

    imgFull.append(imgSmall);

    const info = document.createElement('div');

    const likesLabel = createInfoItem('Likes', image.likes);
    const viewsLabel = createInfoItem('Views', image.views);
    const downloadsLabel = createInfoItem('Downloads', image.downloads);
    info.append(likesLabel, viewsLabel, downloadsLabel);

    photoCard.append(imgFull);
    photoCard.append(info);

    imagesToRender.push(photoCard);
  });
  gallery.append(...imagesToRender);
  lightbox.refresh();
  handleInfiniteScroll();
};

const handleInfiniteScroll = async () => {
  const moreImages = await fetchPixabayAPI(imageToSearch, currentPage);
  const observer = new IntersectionObserver(
    entries => {
      const lastCard = entries[0];

      if (lastCard.isIntersecting) {
        renderMoreImages(moreImages);
        handleScroll();
      }
    },
    { threshold: 0.5 }
  );

  const lastPhotoCard = document.querySelector('.photo-card:last-child');

  if (lastPhotoCard) {
    observer.observe(lastPhotoCard);
  }
};

setInterval(() => {
  console.log(totalFetchedImages);
}, 1000);
