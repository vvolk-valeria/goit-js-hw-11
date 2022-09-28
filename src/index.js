
import {getImg} from './js/api'
import { makeMarkup, resetMarkup } from './js/markup'
import { showMessageNoImages, showMessageMustFill, showMessageEndImages, showMessageFoundPictures } from "./js/messages";
import { lightbox } from "./js/simpleLightbox";
import { registerIntersectionObserver } from "./js/if";
let pageNumber;
const LOCAL_KEY = 'searchQuery';

export const refs = {
  formEl: document.querySelector('#search-form'),
  btnLoadMoreEl: document.querySelector('.load-more'),
}

refs.formEl.addEventListener('submit', onFormClick);
refs.btnLoadMoreEl.addEventListener('click', loadMoreClick);

refs.btnLoadMoreEl.classList.add('visually-hidden');


function onFormClick(evt) {
    evt.preventDefault();
    // if (evt.target.tagName !== 'BUTTON') {
    // return;
    // } 

    resetMarkup();
    const searchQuery = evt.currentTarget.elements.searchQuery.value;
    localStorage.setItem(LOCAL_KEY, searchQuery);
  if (searchQuery === '') {
    showMessageMustFill();
    localStorage.removeItem(LOCAL_KEY);
    refs.btnLoadMoreEl.classList.add('visually-hidden');
    return;
  }
  evt.currentTarget.elements.searchQuery.value = '';
  loadImg(searchQuery, pageNumber = 1);
}


export function loadMoreClick() {
  const searchQueryFromLocalStorage = localStorage.getItem(LOCAL_KEY);
  // console.log(LOCAL_KEY, searchQueryFromLocalStorage);
  loadImg(searchQueryFromLocalStorage, pageNumber+=1);
}


async function loadImg(searchQuery, pageNumber) {
  try {
    const { response:{data}, page } = await getImg(searchQuery, pageNumber);
    if (data.totalHits === 0) {
      showMessageNoImages();
      refs.btnLoadMoreEl.classList.add('visually-hidden');
      return;
    }

    refs.btnLoadMoreEl.classList.remove('visually-hidden');
      if (page === 1) {
        showMessageFoundPictures(data.totalHits); 
        makeMarkup(data.hits);
        lightbox.refresh();
      }
      // if (page > 0) {
      //   registerIntersectionObserver(); 
      //   refs.btnLoadMoreEl.classList.add('visually-hidden');
      // }
      if (page > 1) {
        makeMarkup(data.hits);
        lightbox.refresh();
        smoothScroll();
      } 
        if (page >= data.totalHits / data.hits.length ||  data.hits.length === 0) {
        showMessageEndImages();
        refs.btnLoadMoreEl.classList.add('visually-hidden');
      }
    // makeMarkup(data.hits);
    // lightbox.refresh();
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
  top: cardHeight * 1.3,
  behavior: "smooth",
});
}



//=============



