import axios from "axios";
import { getCookie } from "../utils/cookieUtil";

export const getCountUsers = async (callback: Function) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/count/user`
    );
    callback(response.data);
  } catch (error) {
    callback((error as any).response.data);
  }
};

export const getUsers = async (callback: Function) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
    callback(response.data);
  } catch (error: any) {
    callback(error.response.data);
  }
};

export const createUser = async (data: any, callback: Function) => {
  axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/create/user`,
    data: data,
    headers: { Authorization: `Bearer ${getCookie("tk")}` },
  })
    .then(function (respone) {
      callback(respone.data);
    })
    .catch(function (error) {
      callback(error.response.data);
    });
};

export const deleteUser = async (id: number, callback: Function) => {
  axios({
    method: "delete",
    url: `${process.env.REACT_APP_API_URL}/delete/user/${id}`,
    headers: { Authorization: `Bearer ${getCookie("tk")}` },
  })
    .then(function (respone) {
      callback(respone.data);
    })
    .catch(function (error) {
      callback(error.response.data);
    });
};

export const getUser = async (id: string, callback: Function) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/${id}`
    );
    callback(response.data);
  } catch (error: any) {
    callback(error.response.data);
  }
};

export const editUserAdmin = async (data: any, callback: Function) => {
  axios({
    method: "put",
    url: `${process.env.REACT_APP_API_URL}/edit/user`,
    data: data,
    headers: { Authorization: `Bearer ${getCookie("tk")}` },
  })
    .then(function (respone) {
      callback(respone.data);
    })
    .catch(function (error) {
      callback(error.response.data);
    });
};
