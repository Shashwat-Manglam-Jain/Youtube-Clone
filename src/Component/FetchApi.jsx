import axios from "axios";

const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const options = {
  params: {
    maxResults: '50',
  },
  headers: {
    'X-RapidAPI-Key': '9e7ccf6144mshb8836e663767cf1p13ec17jsn523b2556652c',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
};

export const FetchApi = async (url) => {
  try {
    const response = await axios.get(`${BASE_URL}/${url}`, options);
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // You may choose to handle or log the error differently
  }
};
