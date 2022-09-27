import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '30134376-fefd65acec5dcb1f681d352f7';
const seachParams = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal', 
  safesearch: true,
})

let per_page = 40;


export async function getImg(searchQuery, page) {
  const response = await axios.get(`/?key=${API_KEY}&q=${searchQuery}&${seachParams}&page=${page}&per_page=${per_page}`);
  // page += 1;
  return {response, page};
 
};

