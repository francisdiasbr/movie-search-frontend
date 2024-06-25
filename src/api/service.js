import axios from 'axios';

export const fetchMovies = async (query) => {
  const response = await axios.get(`${process.env.BASE_URL}/search?query=${encodeURIComponent(query)}`)
  return response.data
}

