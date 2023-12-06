import axios from 'axios';

const fetchPixabayAPI = async () => {
  const url = 'https://pixabay.com/api/';
  const apiKey = '41114633-51106070bf303d1c44ed5d4b9';

  try {
    const res = await axios.get(url, {
      params: {
        key: apiKey,
      },
    });
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};

fetchPixabayAPI();
