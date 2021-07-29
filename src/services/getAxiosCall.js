import axios from "axios";

export const getAxiosCall = async (url) => {
  try {
    const data = await axios.get(url);
    if (data.status === 200) {
      return data.data;
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};
