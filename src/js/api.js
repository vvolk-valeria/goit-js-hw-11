import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '30134376-fefd65acec5dcb1f681d352f7';
let page = 1;


export async function getImg(searchQuery) {
  const response = await axios.get(`/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=20`);
  page += 1;
  
  return {response, page};
 
};
