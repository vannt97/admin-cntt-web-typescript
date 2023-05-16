import axios from "axios";
import { RequestLogin } from "./types";
const BASE_URL = process.env.REACT_APP_API_URL;
export const fetchLogin = async (requestLogin: RequestLogin) => {
  const response = await axios.post(`${BASE_URL}/signin`, requestLogin);
  return response.data.data;
};
