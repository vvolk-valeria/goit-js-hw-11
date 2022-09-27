import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '30134376-fefd65acec5dcb1f681d352f7';

let per_page = 40;


export async function getImg(searchQuery, page) {
  const response = await axios.get(`/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`);
  // page += 1;
  console.log(per_page);
  return {response, page};
 
};

