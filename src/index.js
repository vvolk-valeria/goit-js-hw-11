
import {getImg} from './js/api'
import { makeMarkup, resetMarkup } from './js/markup'
import { messageNoImages, messageMustFill, messageEndImages, messageFoundPictures } from "./js/messages";
import { lightbox } from "./js/simpleLightbox";
let pageNumber;
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
    messageMustFill();
    localStorage.removeItem(LOCAL_KEY);
    refs.btnLoadMoreEl.classList.add('visually-hidden');
    return;
  }
  evt.currentTarget.elements.searchQuery.value = '';
  loadImg(searchQuery, pageNumber = 1);
}


function LoadMoreClick() {
  const searchQueryFromLocalStorage = localStorage.getItem(LOCAL_KEY);
  // console.log(LOCAL_KEY, searchQueryFromLocalStorage);
  loadImg(searchQueryFromLocalStorage, pageNumber+=1);
}


async function loadImg(searchQuery, pageNumber) {
  try {
    const { response:{data}, page } = await getImg(searchQuery, pageNumber);
    if (data.totalHits === 0) {
      messageNoImages();
      return;
    }

    refs.btnLoadMoreEl.classList.remove('visually-hidden');
    localStorage.setItem(LOCAL_KEY, searchQuery);
    // refs.formEl.elements.searchQuery.value = '';
    // console.log("page", page);
      if (page === 1) {
        messageFoundPictures(data.totalHits); 
      }
      if (page > 1) {
        makeMarkup(data.hits);
        lightbox.refresh();
        smoothScroll();
    } 
        if (page >= data.totalHits / data.hits.length ||  data.hits.length === 0) {
        messageEndImages();
        refs.btnLoadMoreEl.classList.add('visually-hidden');
      }
    makeMarkup(data.hits);
    lightbox.refresh();
  }
    catch (error) {
      console.log(error)
    } 
}

  
function smoothScroll() {
  const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();
window.scrollBy({
  top: cardHeight * 1,
  behavior: "smooth",
});
}

