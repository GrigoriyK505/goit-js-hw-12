import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { fetchImages } from "./js/pixabay-api.js";
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
const loadMoreButton = document.querySelector(".load-more")

let currentPage = 1;
let currentQuery = ""
let totalHits = 0;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = input.value.trim();

  if (!query) {
    showError("Search field cannot be empty!");
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  hideLoaderMoreButton();
  showLoader();

  try {
    const data = await fetchImages(currentPage, currentQuery);
    totalHits = data.totalHits;
    hideLoader();

    if (!data.hits.length) {
      showWarning("Sorry, there are no images matching your search query. Please try again!");
      return;
    }

    renderGallery(data.hits);
    if (data.hits.length < totalHits) {
      showLoaderMoreButton();
    }

  } catch (error) {
    hideLoader();
    showError("Something went wrong. Please try again later!");
  }
});

loadMoreButton.addEventListener("click", async () => {
  currentPage++;
  showLoader();

  try {
    const data = await fetchImages(currentPage, currentQuery);
    hideLoader();

    renderGallery(data.hits);

    if (currentPage * 15 >= totalHits) {
      hideLoaderMoreButton();
      showWarning("We're sorry, but you've reached the end of search results.")
    }

    scrollPage();
  } catch (error) {
    hideLoader();
    showError("Something went wrong. Please try again later!");
  }
});

function showLoaderMoreButton() {
  loadMoreButton.computedStyleMap.display = "block";
}

function hideLoaderMoreButton() {
    loadMoreButton.computedStyleMap.display = "none";
  }

  function scrollPage() {
    const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behaior: "smooth",
    });
}