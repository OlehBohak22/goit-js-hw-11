import { fetchImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
let page = 1;
let query = '';

form.addEventListener('submit', onSubmit);

async function onSubmit(event) {
  event.preventDefault();
  query = event.target.elements.searchQuery.value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query.',
    });
    return;
  }

  page = 1;
  gallery.innerHTML = '';
  try {
    const data = await fetchImages(query, page);
    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'No images found. Please try again.',
      });
      return;
    }
    renderGallery(data.hits);
    new SimpleLightbox('.gallery a').refresh();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again.',
    });
  }
}
