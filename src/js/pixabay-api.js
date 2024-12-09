import axios from 'axios';

const API_KEY = "47415384-99a3119bdb6a092e7cf8e4330";
const BASE_URL = "https://pixabay.com/api/";

/**
 * @param {string} query
 * @param {number} page
 * @param {number} perPage
 * @returns {Promise<Object>}
 */
export async function fetchImages(query, page = 1, perPage = 15) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Fetch Images Error:", error.message);
    throw error;
  }
}
