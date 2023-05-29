import axios from "axios";

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
