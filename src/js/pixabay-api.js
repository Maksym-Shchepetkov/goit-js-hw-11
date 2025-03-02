import axios from 'axios';

export function fetchImages(searchByText) {
  const options = {
    params: {
      key: '49096990-1cdaad3cdd2c2184e983643c5', // Ваш API ключ
      q: searchByText,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  };

  return axios.get('https://pixabay.com/api/', options);
}
