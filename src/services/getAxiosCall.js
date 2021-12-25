import axios from "axios";

export const getAxiosCall = async (url, token) => {
  try {
    const data = await axios.get(url, {
      headers: {
        Authorization: token,
      },
    });
    if (data.status === 200) {
      console.log(data);
      return { data: data.data };
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};
