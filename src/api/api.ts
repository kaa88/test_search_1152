import Axios from 'axios';
import type { AxiosError, AxiosInstance, AxiosResponse, Method } from 'axios';

const settings = {
   baseURL: process.env.REACT_APP_API_URL,
   withCredentials: true,
   timeout: 3000
};

type API = AxiosInstance & {
   [key: string]: any;
};

const api = Axios.create(settings) as API;
const apiTokenRefresh = Axios.create(settings);

api.interceptors.request.use((config) => {
   config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
   return config;
});

api.interceptors.response.use(
   (response) => response,
   async (error) => {
      if (error.response?.status === 401) {
         let response = await refreshToken();
         if (response instanceof Error) return Promise.reject(response);
         response = await repeatRequest(error.config.method, error.config.url);
         return response;
      } else return Promise.reject(error);
   }
);

async function refreshToken() {
   return apiTokenRefresh
      .get('/user/refresh')
      .then((response) => {
         localStorage.setItem('token', response.data);
      })
      .catch((error) => error);
}
async function repeatRequest(method: Method, url: string) {
   return api[method.toLowerCase()](url)
      .then((response: AxiosResponse) => response)
      .catch((error: AxiosError<any>) => error);
}

export default api;
