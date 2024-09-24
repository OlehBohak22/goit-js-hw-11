import { fetchImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('#loader'); // Елемент індикатора завантаження
let page = 1;
let query = '';
let lightbox; // Екземпляр SimpleLightbox

form.addEventListener('submit', onSubmit);

// Ініціалізація lightbox у глобальному контексті
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

  showLoader(); // Показуємо індикатор перед початком запиту

  fetchImages(query, page)
    .then(data => {
      hideLoader(); // Приховуємо індикатор після завершення запиту

      if (!data || data.hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message: 'No images found. Please try again.',
        });
        return;
      }

      renderGallery(data.hits);

      if (!lightbox) {
        initializeLightbox(); // Ініціалізація при першому завантаженні
      } else {
        lightbox.refresh(); // Оновлення lightbox після кожного нового рендеру
      }
    })
    .catch(error => {
      hideLoader(); // Приховуємо індикатор при помилці
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again.',
      });
    });
}
