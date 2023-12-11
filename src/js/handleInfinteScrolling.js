const gallery = document.querySelector('#gallery');

const handleInfiniteScroll = () => {
  if (gallery.childNodes.length === 0) return;

  const observer = new IntersectionObserver(entries => {
    const lastPhotoCard = entries[0];
    if (!lastPhotoCard.isIntersecting) return;

    console.log('Last card seen');
  });

  observer.observe(document.querySelector('.photo-card:last-child'));
};

export default handleInfiniteScroll;
