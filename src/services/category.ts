import axios from "axios";

export async function getCountCategory(callback: Function) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/count/category`
    );
    callback(response.data);
  } catch (error) {
    throw error;
  }
}
