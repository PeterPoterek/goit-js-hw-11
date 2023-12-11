const loadMoreButton = document.querySelector('.load-more');

const handleShowingLoadMoreNutton = () => {
  loadMoreButton.style.display = 'none';

  const observer = new IntersectionObserver(entries => {
    const lastPhotoCard = entries[0];
    if (!lastPhotoCard.isIntersecting) return;

    console.log('last card seen');
    loadMoreButton.style.display = 'block';
  });

  observer.observe(document.querySelector('.photo-card:last-child'));
};

export { handleShowingLoadMoreNutton };
