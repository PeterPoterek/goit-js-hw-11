import axios from 'axios';

const gallery = document.querySelector('#gallery');

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
    console.log(res.data.hits);
    renderImages(res.data.hits);
  } catch (err) {
    console.log(err);
  }
};

fetchPixabayAPI('cats');

const renderImages = images => {
  images.forEach(image => {
    console.log(image);
    const img = document.createElement('img');
    img.setAttribute('src', image.webformatURL);

    gallery.append(img);
  });
};
