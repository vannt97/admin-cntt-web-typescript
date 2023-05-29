import axios from "axios";

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
