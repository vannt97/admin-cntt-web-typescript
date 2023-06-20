import axios from "axios";
import { getCookie } from "../utils/cookieUtil";

export async function getCountPost(callback: Function) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/count/post`
    );
    callback(response.data);
  } catch (error) {
    throw error;
  }
}

export async function getPosts(callback: Function) {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts`);
    callback(response.data);
  } catch (error) {
    throw error;
  }
}

export async function createPost(data: any, callback: Function) {
  axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/create/post`,
    data: data,
    headers: { Authorization: `Bearer ${getCookie("tk")}` },
  })
    .then(function (respone) {
      callback(respone.data);
    })
    .catch(function (error) {
      callback(error.response.data);
    });
}

export async function editPost(slug: string, data: any, callback: Function) {
  axios({
    method: "PUT",
    url: `${process.env.REACT_APP_API_URL}/edit/post?slug=${slug}`,
    data,
    headers: { Authorization: `Bearer ${getCookie("tk")}` },
  })
    .then(function (response) {
      callback(response);
    })
    .catch(function (error) {
      callback(error.response.data);
    });
}

export async function removePost(id: string, callback: Function) {
  axios({
    method: "delete",
    url: `${process.env.REACT_APP_API_URL}/delete/post/${id}`,
    headers: { Authorization: `Bearer ${getCookie("tk")}` },
  })
    .then(function (respone) {
      callback(respone.data);
    })
    .catch(function (error) {
      callback(error.response.data);
    });
}

export async function getPost(id: string, callback: Function) {
  axios({
    method: "GET",
    url: `${process.env.REACT_APP_API_URL}/posts/${id}`,
  })
    .then(function (respone) {
      callback(respone.data);
    })
    .catch(function (error) {
      callback(error.response.data);
    });
}
