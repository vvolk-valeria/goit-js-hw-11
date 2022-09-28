import { Notify } from 'notiflix/build/notiflix-notify-aio';

//* Системные сообщения
export function showMessageNoImages() {
  Notify.failure(`Sorry, there are no images matching your search query. Please try again.`, options);
}
export function showMessageMustFill() {
  Notify.info(`Fill in the field to search for images.`, options);
}
export function showMessageEndImages() {
  Notify.info(`We're sorry, but you've reached the end of search results.`, options);
}
export function showMessageFoundPictures(amount) {
  Notify.success(`Hooray! We found ${amount} images.`, options);
}

const options = {
  // position: 'left-top',
  timeout: 2000,
  width: '360px'
}