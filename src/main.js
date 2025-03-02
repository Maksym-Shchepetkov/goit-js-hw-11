import { fetchImages } from './js/pixabay-api';
import {
  addMarkup,
  showLoader,
  closeLoader,
  showError,
} from './js/render-functions';

const form = document.querySelector('.input-container');
let searchQuery = ''; // Глобальна змінна для збереження запиту

function handleFormSubmit(event) {
  event.preventDefault();
  searchQuery = form.elements.search.value.trim();

  if (searchQuery) {
    showLoader(); // Показати лоадер
    fetchImages(searchQuery)
      .then(response => {
        const images = response.data.hits;
        if (images.length === 0) {
          showError(
            `Sorry, there are no images matching your search query. Please try again!`
          );
        } else {
          addMarkup(images); // Додати зображення до галереї
        }
      })
      .catch(error => {
        showError(
          `Sorry, there was an error fetching the images. Please try again!`
        );
      })
      .finally(() => {
        form.reset(); // Скидання форми
        closeLoader(); // Приховати лоадер
      });
  } else {
    showError(`Please enter a search query!`);
  }
}

function init() {
  form.addEventListener('submit', handleFormSubmit); // Додати обробник події
}

init(); // Ініціалізувати програму
