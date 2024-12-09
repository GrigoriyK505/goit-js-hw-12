const API_KEY = "47415384-99a3119bdb6a092e7cf8e4330";
const BASE_URL = "https://pixabay.com/api/";

/**
 * @param {string} query
 * @returns {Promise<Object>}
 */

export async function fetchImages(query) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch Images Error:", error.message);
    throw error;
  }
}