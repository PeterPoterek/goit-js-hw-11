import axios from 'axios';
import Notiflix from 'notiflix';
import {
  firstFetch,
  setFirstFetch,
  endOfResults,
  setEndOfResults,
} from './globalVariables';

const url = 'https://pixabay.com/api/';
const apiKey = '41114633-51106070bf303d1c44ed5d4b9';

const gallery = document.querySelector('#gallery');

const fetchPixaBayApi = async (search, currentPage, imagesPerPage) => {
  console.log(currentPage, 'curr page');
  if (endOfResults || currentPage === 14) {
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
    return [];
  }

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

    if (res.data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return [];
    } else {
      if (firstFetch) {
        Notiflix.Notify.success(
          `Hooray! We found ${res.data.totalHits} images.`
        );

        setFirstFetch(false);
      } else if (res.data.hits.length < imagesPerPage) {
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
        setEndOfResults(true);
      }

      return res.data.hits;
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};

export default fetchPixaBayApi;
