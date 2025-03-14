import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import pathIcon from '../img/error.svg';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryList = document.querySelector('.gallery-list');

export function addMarkup(images) {
  galleryList.innerHTML = '';

  const galleryItems = images.map(image => {
    const galleryItem = document.createElement('li');
    galleryItem.classList.add('gallery-item');

    const galleryLink = document.createElement('a');
    galleryLink.classList.add('gallery-link');
    galleryLink.href = image.largeImageURL;

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

    galleryItem.append(infoContainer);
    galleryLink.append(galleryImg);
    galleryItem.append(galleryLink);

    return galleryItem;
  });

  galleryList.append(...galleryItems);

  const modal = new SimpleLightbox('.gallery-list a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  modal.refresh();
}

export function showLoader() {
  document.querySelector('.loader').classList.remove('hidden');
}

export function closeLoader() {
  document.querySelector('.loader').classList.add('hidden');
}

export function showError(message) {
  iziToast.error({
    message: message,
    position: 'topRight',
    maxWidth: '432px',
    iconUrl: pathIcon,
    iconColor: '#ffffff',
    messageColor: '#ffffff',
    backgroundColor: '#ef4040',
    messageSize: '16px',
    messageLineHeight: '24px',
  });
}

export function clearGallery() {
  const galleryList = document.querySelector('.gallery-list');
  galleryList.innerHTML = '';
}
