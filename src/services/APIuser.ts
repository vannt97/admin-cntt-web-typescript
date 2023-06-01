import axios from "axios";
import { getCookie } from "../utils/cookieUtil";

export const getCountUsers = async (callback: Function) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/count/user`
    );
    callback(response.data);
  } catch (error) {
    throw error;
  }
};

export const getUsers = async (callback: Function) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
    callback(response.data);
  } catch (error) {
    throw error;
  }
};

export const createUser = async (data: any, callback: Function) => {
  // try {
  //   const response = await axios.post(
  //     `${process.env.REACT_APP_API_URL}/user/create`,
  //     data
  //   );
  //   callback(response);
  // } catch (error) {
  //   console.log((error as any).response.data);
  // }

  axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/user/create`,
    data: data,
    headers: { Authorization: `Bearer ${getCookie("tk")}` },
  })
    .then(function (respone) {
      callback(respone.data);
    })
    .catch(function (error) {
      callback( error.response.data)
    });
};
