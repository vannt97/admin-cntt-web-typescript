import axios from "axios";
import { getCookie } from "../utils/cookieUtil";

export async function getCountTag(callback: Function) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/count/tag`
    );
    callback(response.data);
  } catch (error) {
    throw error;
  }
}

export async function getTags(callback: Function) {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/tags`);
    callback(response.data);
  } catch (error) {
    throw error;
  }
}

export async function createTag(data: string, callback: Function) {
  let bodyFormData = new FormData();
  bodyFormData.append("name", data);
  axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/create/tag`,
    data: bodyFormData,
    headers: { Authorization: `Bearer ${getCookie("tk")}` },
  })
    .then(function (respone) {
      callback(respone.data);
    })
    .catch(function (error) {
      callback(error.response.data);
    });
}

export async function editTag(data: {}, callback: Function) {
  let bodyFormData = new FormData();
  bodyFormData.append("name", (data as any).name);
  bodyFormData.append("id", (data as any).id);
  axios({
    method: "put",
    url: `${process.env.REACT_APP_API_URL}/edit/tag`,
    headers: { Authorization: `Bearer ${getCookie("tk")}` },
    data: bodyFormData,
  })
    .then(function (respone) {
      callback(respone.data);
    })
    .catch(function (error) {
      callback(error.response.data);
    });
}

export async function removeTag(id: string, callback: Function) {
  axios({
    method: "delete",
    url: `${process.env.REACT_APP_API_URL}/delete/tag/${id}`,
    headers: { Authorization: `Bearer ${getCookie("tk")}` },
  })
    .then(function (respone) {
      callback(respone.data);
    })
    .catch(function (error) {
      callback(error.response.data);
    });
}

export async function getTag(id: string, callback: Function) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/tags/${id}`,
      {
        headers: { Authorization: `Bearer ${getCookie("tk")}` },
      }
    );
    callback(response.data);
  } catch (error: any) {
    callback(error.response.data);
  }
}
