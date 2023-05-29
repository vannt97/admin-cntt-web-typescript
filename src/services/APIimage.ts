import axios from "axios";

export async function uploadImage(callback: Function, data: File) {
  try {
    const respone = await axios.post(
      `${process.env.REACT_APP_API_URL}/upload`,
      { file: data }
    );
    callback(respone);
  } catch (error) {
    throw error;
  }
}
