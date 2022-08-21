import axios from "axios";

export function getNews(category = 'General') {
  const API_KEY = `1b8aa0bda86f4319b967829408d5098d`;
  const API_Endpoint = `https://newsapi.org/v2/top-headlines?country=us&category=${category}`;

   return axios.get(`${API_Endpoint}&apiKey=${API_KEY}`)  
}
