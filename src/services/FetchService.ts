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
      const query = searchStr ? `?q=${searchStr}` : '';
      return await api.get<IPost[]>(`/posts${query}`);
   }
};

export default FetchService;
