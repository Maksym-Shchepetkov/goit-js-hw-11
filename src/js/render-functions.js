import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import noResults from '../img/error.svg';

import fetchData from './pixabay-api';

export default function addMarkup(images) {
  const generalEl = document.querySelector('.gallery-list');

  generalEl.innerHTML = '';

  if (images.length === 0) {
    iziToast.error({
      message: `Sorry, there are no images matching your search query. Please try again!`,
      position: 'topRight',
      maxWidth: '432px',
      iconUrl: noResults,
      messageColor: '#ffffff',
      backgroundColor: '#ef4040',
      messageSize: '16px',
      messageLineHeight: '24px',
    });
    return;
  }

  const galleryList = images.map(image => {
    const galleryItems = document.createElement('li');
    galleryItems.classList.add('gallery-item');

    const galleryLinks = document.createElement('a');
    galleryLinks.classList.add('gallery-link');
    galleryLinks.href = image.largeImageURL;

    const galleryImg = document.createElement('img');
    galleryImg.classList.add('gallery-image');
    galleryImg.src = image.webformatURL;
    galleryImg.alt = image.tags;

    const infoContainer = document.createElement('div');
    infoContainer.classList.add('info-container');

    const infoItems = [
      { label: 'Likes', value: image.likes },
      { label: 'Views', value: image.views },
      { label: 'Comments', value: image.comments },
      { label: 'Downloads', value: image.downloads },
    ];

    infoItems.forEach(item => {
      const infoParagraph = document.createElement('p');
      infoParagraph.classList.add('par');
      infoParagraph.textContent = item.label;

      const infoValue = document.createElement('span');
      infoValue.classList.add('sub-par');
      infoValue.textContent = item.value;

      infoParagraph.append(infoValue);
      infoContainer.append(infoParagraph);
    });

    galleryItems.append(infoContainer);

    galleryItems.append(galleryLinks);

    galleryLinks.append(galleryImg);
    return galleryItems;
  });
  generalEl.append(...galleryList);

  const modal = new SimpleLightbox('.gallery-list a', {
    captionsData: 'alt',
    captionDelay: 250,
  });

  modal.refresh();
}

const form = document.querySelector('.input-container');

form.addEventListener('submit', event => {
  event.preventDefault();
  const searchQuery = form.elements.search.value.trim();

  if (searchQuery) {
    showLoader();

    fetchData(searchQuery)
      .then(response => {
        const images = response.data.hits;
        addMarkup(images);
      })
      .catch(error => {
        iziToast.error({
          message: `Sorry, there was an error fetching the images. Please try again!`,
          position: 'topRight',
          maxWidth: '432px',
          iconUrl: noResults,
          messageColor: '#ffffff',
          backgroundColor: '#ef4040',
          messageSize: '16px',
          messageLineHeight: '24px',
        });
      })
      .finally(() => {
        form.reset();
        closeLoader();
      });
  } else {
    iziToast.error({
      message: `Sorry, there was an error fetching the images. Please try again!`,
      position: 'topRight',
      maxWidth: '432px',
      iconUrl: noResults,
      messageColor: '#ffffff',
      backgroundColor: '#ef4040',
      messageSize: '16px',
      messageLineHeight: '24px',
    });
  }
});

const loader = document.querySelector('.loader');

function showLoader() {
  loader.classList.remove('hidden');
}

function closeLoader() {
  loader.classList.add('hidden');
}
