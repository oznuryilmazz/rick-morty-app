import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_RICK_AND_MORTY_API_URL,
});
