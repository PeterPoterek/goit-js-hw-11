import {
  currentSearch,
  setCurrentPage,
  currentPage,
} from './globalVariables.js';
import fetchPixaBayApi from './fetchPixaBayAPI.js';

const handleInfiniteScroll = async () => {
  const moreImages = await fetchPixaBayApi(currentSearch, currentPage);
  const observer = new IntersectionObserver(
    entries => {
      const lastCard = entries[0];

      if (lastCard.isIntersecting) {
        setCurrentPage(1);
        renderMoreImages(moreImages);
      }
    },
    { threshold: 0.5 }
  );

  const lastPhotoCard = document.querySelector('.photo-card:last-child');

  if (lastPhotoCard) {
    observer.observe(lastPhotoCard);
  }
};

export default handleInfiniteScroll;
