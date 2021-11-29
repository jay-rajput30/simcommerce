import axios from "axios";

export const deleteAxiosCall = async (url, id) => {
  try {
    const data = await axios.post(url, { productId: id });
    if (data.status === 200) {
      return data.data;
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};
