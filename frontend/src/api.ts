import axios from 'axios';

const baseURL = 'http://146.185.154.90:8000';

export const api = axios.create({ baseURL });
