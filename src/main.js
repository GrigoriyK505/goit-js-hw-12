import { fetchImages } from "./js/pixabay-api.js";
import {
  clearGallery,
  renderGallery,
  showLoader,
  hideLoader,
  showError,
  showWarning,
  showEndOfResultsMessage,
} from "./js/render-functions.js";

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const loadMoreBtn = document.createElement("button");
loadMoreBtn.textContent = "Load more";
loadMoreBtn.classList.add("load-more");
loadMoreBtn.style.display = "none";
document.body.appendChild(loadMoreBtn);

let currentQuery = "";
let currentPage = 1;
let totalHits = 0;

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Зупиняє перезавантаження сторінки
  const query = input.value.trim(); // Отримує значення пошуку

  if (!query) {
    showError("Search field cannot be empty!"); // Показує помилку
    return;
  }

  // Скидає стан при новому пошуку
  if (query !== currentQuery) {
    currentQuery = query;
    currentPage = 1;
    clearGallery();
    loadMoreBtn.style.display = "none";
  }

  showLoader(); // Показує індикатор завантаження

  try {
    const data = await fetchImages(currentQuery, currentPage, 15); // Запит на сервер

    hideLoader(); // Приховує індикатор завантаження

    if (!data.hits.length) {
      showWarning("Sorry, there are no images matching your search query."); // Попередження, якщо результатів немає
      return;
    }

    totalHits = data.totalHits; // Зберігає загальну кількість результатів

    renderGallery(data.hits); // Рендерить галерею

    if (currentPage * 15 >= totalHits) {
      showEndOfResultsMessage(); // Повідомлення про кінець результатів
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.style.display = "block"; // Показує кнопку "Load more"
    }
  } catch (error) {
    hideLoader(); // Приховує індикатор завантаження при помилці
    showError("Something went wrong. Please try again later!");
  }
});


loadMoreBtn.addEventListener("click", async () => {
  currentPage += 1;

  showLoader();

  try {
    const data = await fetchImages(currentQuery, currentPage, 15);

    hideLoader();

    renderGallery(data.hits);

    if (currentPage * 15 >= totalHits) {
      showEndOfResultsMessage();
      loadMoreBtn.style.display = "none";
    }

    const { height: cardHeight } = document
      .querySelector(".gallery")
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
    });
  } catch (error) {
    hideLoader();
    showError("Something went wrong. Please try again later!");
  }
});
