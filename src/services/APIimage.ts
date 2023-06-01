import axios from "axios";
import { getCookie } from "../utils/cookieUtil";

export async function uploadImage(callback: Function, data: File) {
  let bodyFormData = new FormData();
  bodyFormData.append("file", data);
  axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/upload`,
    data: bodyFormData,
    headers: { Authorization: `Bearer ${getCookie("tk")}` },
  })
    .then(function (respone) {
      callback(respone.data);
    })
    .catch(function (respone) {
      console.log("error: ", respone);
    });

  
}
