import axios from "axios";

export const deleteAxiosCall = async (url, id, token) => {
  try {
    const data = await axios.post(
      url,
      { removeProductId: id },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (data.status === 200) {
      return data.data;
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};
