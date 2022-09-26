
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import {getImg} from './js/api'
import {makeMarkup, resetMarkup} from './js/markup'

const LOCAL_KEY = 'searchQuery';

const refs = {
  formEl: document.querySelector('#search-form'),
  btnLoadMoreEl: document.querySelector('.load-more'),
}

refs.formEl.addEventListener('submit', onFormClick);
refs.btnLoadMoreEl.addEventListener('click', LoadMoreClick);

refs.btnLoadMoreEl.classList.add('visually-hidden');



function onFormClick(evt) {
    evt.preventDefault();
    // if (evt.target.tagName !== 'BUTTON') {
    // return;
    // } 
  resetMarkup();
 
  const searchQuery = evt.currentTarget.elements.searchQuery.value;
  
  if (searchQuery === '') {
    mustFill();

    localStorage.removeItem(LOCAL_KEY);
    
    refs.btnLoadMoreEl.classList.add('visually-hidden');
    return;
  }

  loadImg(searchQuery);
  evt.currentTarget.elements.searchQuery.value = '';

}


function LoadMoreClick() {
  const searchQueryFromLocalStorage = localStorage.getItem(LOCAL_KEY);
  // console.log(LOCAL_KEY, searchQueryFromLocalStorage);
  loadImg(searchQueryFromLocalStorage);
}


async function loadImg(searchQuery) {
  try {
    const { response:{data}, page } = await getImg(searchQuery);
    if (data.totalHits === 0) {
      noImages();
      return;
    }

  refs.btnLoadMoreEl.classList.remove('visually-hidden');
  localStorage.setItem(LOCAL_KEY, searchQuery);
  // refs.formEl.elements.searchQuery.value = '';

    // console.log("page", page);
    if (page === 2) {
      foundPictures(data.totalHits); 
    }
    if (page > data.totalHits / data.hits.length) {
      endImages();
      refs.btnLoadMoreEl.classList.add('visually-hidden');
}
    makeMarkup(data.hits);
    
  } catch (error) {
     console.log(error)
  }
    
}



var lightbox = new SimpleLightbox('.gallery a'
  // , {
  //   captionsData: 'alt',
  //   captionPosition: 'bottom',
  //   captionDelay: 100,
  // }
);


let gallery = new SimpleLightbox('.gallery a');

gallery.on('show.simplelightbox', function () {
	// do something…
});


//* Системные сообщения
function noImages() {
  Notify.failure(`Sorry, there are no images matching your search query. Please try again.`, options);
}
function mustFill() {
  Notify.info(`Fill in the field to search for images.`, options);
}
function endImages() {
  Notify.info(`We're sorry, but you've reached the end of search results.`, options);
}
function foundPictures(amount) {
  Notify.success(`Hooray! We found ${amount} images.`, options);
}

const options = {
  // position: 'left-top',
  timeout: 2000,
  width: '360px'
}
  