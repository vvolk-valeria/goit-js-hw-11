import { refs, LoadMoreClick } from "./../index";

//* Бесконечный скролл

export function registerIntersectionObserver() {

  const onObserver = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      LoadMoreClick();
    }
       
  })
};

const options = {
  rootMargin: '300px',
}

const observer = new IntersectionObserver(onObserver, options);

observer.observe(refs.btnLoadMoreEl);
}
