import axios, { type AxiosError } from 'axios';
import { env } from "@/env";
const TIMEOUT = 1 * 60 * 1000;

axios.defaults.timeout = TIMEOUT;

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
axios.defaults.baseURL = env.NEXT_PUBLIC_SERVER_API_URL;

const setupAxiosInterceptors = onUnauthenticated => {
  const onRequestSuccess = config => {
    return config;
  };
  const onResponseSuccess = response => response;
  const onResponseError = (err: AxiosError) => {
    const status = err.status || (err.response ? err.response.status : 0);
    if (status === 401) {
      onUnauthenticated();
    }
    return Promise.reject(err);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
