import { fetchImages } from './js/pixabay-api';
import {
  addMarkup,
  showLoader,
  closeLoader,
  showError,
  clearGallery,
} from './js/render-functions';

const form = document.querySelector('.input-container');
let searchQuery = '';

function handleFormSubmit(event) {
  event.preventDefault();
  searchQuery = form.elements.search.value.trim();

  if (searchQuery) {
    showLoader();
    fetchImages(searchQuery)
      .then(response => {
        const images = response.data.hits;
        if (images.length === 0) {
          showError(
            'Sorry, there are no images matching your search query. Please try again!'
          );
          clearGallery();
        } else {
          addMarkup(images);
        }
      })
      .catch(error => {
        showError(
          'Sorry, there was an error fetching the images. Please try again!'
        );
        clearGallery();
      })
      .finally(() => {
        form.reset();
        closeLoader();
      });
  } else {
    showError('Please enter a search query!');
    clearGallery();
  }
}

function init() {
  form.addEventListener('submit', handleFormSubmit);
}

init();
