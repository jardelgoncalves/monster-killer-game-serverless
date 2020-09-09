import axios from 'axios';

const api = axios.create({
  baseURL: 'https://2n88vpooki.execute-api.us-east-1.amazonaws.com/dev/'
})

export default api