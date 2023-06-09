import axios from "axios";
import { getCookie } from "../utils/cookieUtil";

export async function getCountCategory(callback: Function) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/count/category`
    );
    callback(response.data);
  } catch (error: any) {
    console.log(error.response.data);
  }
}

export async function getCategories(callback: Function) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/categories`
    );
    callback(response.data);
  } catch (error: any) {
    console.log(error.response.data);
  }
}

export async function getCategory(id: string, callback: Function) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/categories/${id}`,
      {
        headers: { Authorization: `Bearer ${getCookie("tk")}` },
      }
    );
    callback(response.data);
  } catch (error: any) {
    callback(error.response.data);
  }
}

export async function createCategory(data: string, callback: Function) {
  let bodyFormData = new FormData();
  bodyFormData.append("name", data);
  axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/create/category`,
    data: bodyFormData,
    headers: { Authorization: `Bearer ${getCookie("tk")}` },
  })
    .then(function (respone) {
      callback(respone.data);
    })
    .catch(function (error) {
      console.log("error: ", error);
      callback(error.response.data);
    });
}
