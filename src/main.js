import { fetchImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('#loader');
let page = 1;
let query = '';
let lightbox;

form.addEventListener('submit', onSubmit);

function initializeLightbox() {
  lightbox = new SimpleLightbox('.gallery a');
}

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}

function onSubmit(event) {
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

  showLoader();

  fetchImages(query, page)
    .then(data => {
      hideLoader();

      if (!data || data.hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message: 'No images found. Please try again.',
        });
        return;
      }

      renderGallery(data.hits);

      if (!lightbox) {
        initializeLightbox();
      } else {
        lightbox.refresh();
      }
    })
    .catch(error => {
      hideLoader();
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again.',
      });
    });
}
