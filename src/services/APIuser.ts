import axios from "axios";

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
