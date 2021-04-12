import axios from "axios";

const BASE_URL = "https://tarea-1-breaking-bad.herokuapp.com/api/";

const axiosRequest = (url, options) => {
  return axios.get(`${BASE_URL}${url}`, options);
};

export default axiosRequest;
