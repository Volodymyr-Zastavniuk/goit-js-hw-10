import './css/styles.css';
import Notiflix from 'notiflix';
import Debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import {
  createMarkupList,
  createMarkupSingleName,
  createMarkupSingleInfo,
} from './js/createMarkup';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('input#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', Debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
  const name = e.target.value.trim();
  if (!name) {
    return;
  }
  fetchCountries(name)
    .then(data => {
      if (data.length > 10) {
        return Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if (2 <= data.length && data.length <= 10) {
        refs.list.innerHTML = createMarkupList(data);
        refs.info.innerHTML = '';
      }
      if (data.length == 1) {
        refs.list.innerHTML = createMarkupSingleName(...data);
        refs.info.innerHTML = createMarkupSingleInfo(...data);
      }
    })
    .catch(error => {
      Notiflix.Notify.warning('Something went wrong, please try again later');
      console.log('Catch Error :', error);
    });
}
