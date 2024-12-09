import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const gallery = document.createElement("div");
gallery.classList.add("gallery");
document.body.appendChild(gallery);

const loader = document.createElement("div");
loader.classList.add("loader");
loader.style.display = "none";
loader.innerHTML = '<div class="css-loader"></div>';
document.body.appendChild(loader);

const lightbox = new SimpleLightbox(".gallery a");

export function clearGallery() {
  gallery.innerHTML = "";
}

export function showLoader() {
  loader.style.display = "block";
}

export function hideLoader() {
  loader.style.display = "none";
}

export function renderGallery(images) {
  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
        `
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}">
          <div>
            <p>Likes: ${likes}</p>
            <p>Views: ${views}</p>
            <p>Comments: ${comments}</p>
            <p>Downloads: ${downloads}</p>
          </div>
        </a>
      `
    )
    .join("");
  gallery.insertAdjacentHTML("beforeend", markup);
  lightbox.refresh();
}

export function showError(message) {
  iziToast.error({
    title: "Error",
    message: message,
  });
}

export function showWarning(message) {
  iziToast.warning({
    title: "No Results",
    message: message,
  });
}

export function showEndOfResultsMessage() {
  iziToast.info({
    title: "End of Results",
    message: "We're sorry, but you've reached the end of search results.",
  });
}
