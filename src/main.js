import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import {
  fetchImages,
} from "./js/pixabay-api.js";
import {
  clearGallery,
  renderGallery,
  showLoader,
  hideLoader,
  showError,
  showWarning,
} from "./js/render-functions.js";

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const loadMoreButton = document.createElement("button");
loadMoreButton.textContent = "Load more";
loadMoreButton.classList.add("load-more");
loadMoreButton.style.display = "none";
document.body.appendChild(loadMoreButton);

let query = "";
let currentPage = 1;
const perPage = 15;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  query = input.value.trim();

  if (!query) {
    showError("Search field cannot be empty!");
    return;
  }

  clearGallery();
  currentPage = 1;
  loadMoreButton.style.display = "none";

  try {
    const data = await fetchImages(query, currentPage, perPage);

    if (!data.hits.length) {
      showWarning("Sorry, there are no images matching your search query. Please try again!");
      return;
    }

    renderGallery(data.hits);

    if (data.totalHits > perPage) {
      loadMoreButton.style.display = "block";
    } else {
      displayEndMessage();
    }
  } catch (error) {
    showError("Something went wrong. Please try again later!");
  }
});

loadMoreButton.addEventListener("click", async () => {
  currentPage += 1;
  showLoader();

  try {
    const data = await fetchImages(query, currentPage, perPage);
    hideLoader();

    renderGallery(data.hits);

    scrollPage();

    const totalLoaded = currentPage * perPage;
    if (totalLoaded >= data.totalHits) {
      loadMoreButton.style.display = "none";
      displayEndMessage();
    }
  } catch (error) {
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: "topRight",
      timeout: 5000,
    close: true,
    progressBar: true,
    });
  }
});

function scrollPage() {
  const galleryItems = document.querySelectorAll(".gallery a");
  if (galleryItems.length > 0) {
    const cardHeight = galleryItems[0].getBoundingClientRect().height; // Висота однієї картки
    window.scrollBy({
      top: cardHeight * 2, // Прокрутка на дві висоти картки
      behavior: "smooth",  // Плавна анімація
    });
  }
}
