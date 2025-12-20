import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:3000/api/v1`,
});

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (res) => res,
  async (error) => {
    try {
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export { api };
