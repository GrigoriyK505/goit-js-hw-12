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
  showLoader();

  try {
    const data = await fetchImages(query, currentPage, perPage);
    hideLoader();
    if (!data.hits.length) {
      showWarning("Sorry, there are no images matching your search query. Please try again!");
      return;
    }

    renderGallery(data.hits);
    if (data.hits.length === perPage) {
      loadMoreButton.style.display = "block";
    }
  } catch (error) {
    hideLoader();
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

    if (data.hits.length < perPage) {
      loadMoreButton.style.display = "none";
    }
  } catch (error) {
    hideLoader();
    showError("Something went wrong. Please try again later!");
  }
});
