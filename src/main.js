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

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = input.value.trim();

  if (!query) {
    showError("Search field cannot be empty!");
    return;
  }

  clearGallery();
  showLoader();

  try {
    const data = await fetchImages(query);
    hideLoader();

    if (!data.hits.length) {
      showWarning("Sorry, there are no images matching your search query. Please try again!");
      return;
    }

    renderGallery(data.hits);
  } catch (error) {
    hideLoader();
    showError("Something went wrong. Please try again later!");
  }
});