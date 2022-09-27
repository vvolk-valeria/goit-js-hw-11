import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

//* для отображения большой версии изображений
export var lightbox = new SimpleLightbox('.photo-card a', {
    // captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  }
);