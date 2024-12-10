import axios from "axios";
const API_KEY = "47415384-99a3119bdb6a092e7cf8e4330";
const BASE_URL = "https://pixabay.com/api/";
const PER_PAGE = 15;

/**
 * @param {string} query
 * @param {number} page
 * @returns {Promise<Object>}
 */

export async function fetchImages(currentPage, query) {
  try {
    const { data } = await axios.get(BASE_URL, {
      params: {
        key: `${API_KEY}`,
        q: `${query}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: `${PER_PAGE}`,
        page: `${currentPage}`,
      },
    });
    return data;
  } catch (error) {
    console.error('Fetch Images Error:', error.message);
    throw error;
  }
}