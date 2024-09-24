const API_KEY = '46156366-74388488ea9228d7ab1fb8713';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error fetching images');
    return response.json();
  } catch (error) {
    console.error('Error:', error);
  }
}
