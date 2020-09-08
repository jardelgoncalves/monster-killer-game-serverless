import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jaowxmg315.execute-api.us-east-1.amazonaws.com/dev/'
})

export default api