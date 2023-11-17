import Axios from 'axios';
import { IPost } from '../types/types';

const API_PATH = 'https://jsonplaceholder.typicode.com';

const settings = {
   baseURL: API_PATH,
   timeout: 10000
};

const api = Axios.create(settings);

const FetchService = {
   async getList(searchStr: string) {
      await _wait_(1);
      const query = searchStr ? `?q=${searchStr}` : '';
      return await api.get<IPost[]>(`/posts${query}`);
   }
};

export default FetchService;

export async function _wait_(seconds = 3) {
   return new Promise((resolve) => {
      setTimeout(() => resolve(true), seconds * 1000);
   });
}
