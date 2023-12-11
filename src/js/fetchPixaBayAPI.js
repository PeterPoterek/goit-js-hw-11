import axios from 'axios';
import Notiflix from 'notiflix';

const url = 'https://pixabay.com/api/';
const apiKey = '41114633-51106070bf303d1c44ed5d4b9';

const fetchPixaBayApi = async (search, currentPage, imagesPerPage) => {
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
      Notiflix.Notify.success(`Hooray! We found ${res.data.totalHits} images.`);
      return res.data.hits;
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};

export default fetchPixaBayApi;
