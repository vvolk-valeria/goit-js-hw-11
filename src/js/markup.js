const galleryEl = document.querySelector('.gallery');

export function makeMarkup(images) {
  const markup = images.map(({webformatURL, tags, likes, views, comments, downloads, largeImageURL}) =>
    `<div class="photo-card"><a class="img-link" href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
      <div class="info">
          <p class="info-item">
          <b>Likes </b><span>${likes}</span>
          </p>
          <p class="info-item">
                  <b>Views </b><span>${views}</span>
          </p>
          <p class="info-item">
          <b>Comments </b><span>${comments}</span>
          </p>
          <p class="info-item">
          <b>Downloads </b><span>${downloads}</span>
          </p>
      </div>
      </div>`
  ).join('');
  // console.log(markup);
  addMarkup(galleryEl, markup);
}

export function resetMarkup() {
  galleryEl.innerHTML = '';
  console.log('resetMarkup');
}

function addMarkup(elem, markup) {
  elem.insertAdjacentHTML('beforeend', markup);
}