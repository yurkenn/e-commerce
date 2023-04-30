import axios from 'axios';

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const { origin } = new URL(config.url);

    const allowedOrigins = [process.env.REACT_APP_BASE_ENDPOINT];
    const token = localStorage.getItem('acces-token');

    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = token;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export const fetchProductList = async ({ pageParam = 0 }) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ENDPOINT}/product?page=${pageParam}`
  );
  return data;
};

export const fetchProductDetail = async (id) => {
  const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/product/${id}`);
  return data;
};

export const fetchLogin = async (values) => {
  const { data } = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/login`, values);
  return data;
};

export const fetchRegister = async (values) => {
  const { data } = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/register`, values);
  return data;
};

export const fetchMe = async () => {
  const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/me`);
  return data;
};

export const fetchLogout = async () => {
  const { data } = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/logout`, {
    refresh_token: localStorage.getItem('refresh-token'),
  });
  return data;
};

export const postOrder = async (input) => {
  const { data } = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/order`, input);
  return data;
};

export const fetchOrders = async () => {
  const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/order`);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await axios.delete(`${process.env.REACT_APP_BASE_ENDPOINT}/product/${id}`);
  return data;
};

export const updateProduct = async (id, input) => {
  const { data } = await axios.put(`${process.env.REACT_APP_BASE_ENDPOINT}/product/${id}`, input);
  return data;
};

export const createProduct = async (input) => {
  const { data } = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/product/`, input);
  return data;
};
