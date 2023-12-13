import axios from 'axios';
import Notiflix from 'notiflix';
import {
  firstFetch,
  setFirstFetch,
  endOfResults,
  setEndOfResults,
  setTotalImages,
  totalImages,
} from './globalVariables';

const url = 'https://pixabay.com/api/';
const apiKey = '41114633-51106070bf303d1c44ed5d4b9';

const loadMoreButton = document.querySelector('.load-more');
const gallery = document.querySelector('#gallery');

const fetchPixaBayApi = async (search, currentPage, imagesPerPage) => {
  if (endOfResults) {
    return;
  }

  try {
    if (currentPage <= 0) {
      Notiflix.Notify.failure('Invalid page number. Please try again.');
      return [];
    }

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

    if (res.data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return [];
    } else {
      if (firstFetch) {
        setTotalImages(res.data.totalHits);
        Notiflix.Notify.success(`Hooray! We found ${totalImages} images.`);
        setFirstFetch(false);
      }

      return res.data.hits;
    }
  } catch (err) {}
};

export default fetchPixaBayApi;
