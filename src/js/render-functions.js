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

const form = document.createElement("form");
form.id = "search-form";
form.innerHTML = `
  <input type="text" id="search-input" placeholder="Search images...">
  <button type="submit">Search</button>
`;
document.body.prepend(form);

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

export function showLoadingToast() {
  iziToast.info({
    id: "loading-toast",
    title: "Loading",
    message: "Fetching images, please wait...",
    timeout: false, // Сповіщення не зникає автоматично
    close: false, // Забороняємо користувачу вручну закривати сповіщення
    position: "topRight",
  });
}

export function hideLoadingToast() {
  iziToast.hide({}, document.querySelector(".iziToast#loading-toast"));
}


/**
 * @param {Array} images
 */
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

/**
 * @param {string} message
 */
export function showError(message) {
  iziToast.error({
    title: "Error",
    message: message,
  });
}

/**
 * @param {string} message
 */
export function showWarning(message) {
  iziToast.warning({
    title: "No Results",
    message: message,
  });
}