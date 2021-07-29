import axios from "axios";
import { useReducer } from "react";

const reducerFunc = (state, action) => {
  switch (action.type) {
    case "success":
      return { ...state, status: "resolved" };
    case "error":
      return { ...state, status: "rejected", error: action.payload };
    case "started":
      return { ...state, status: "pending" };
    default:
      return state;
  }
};

export const useAxios = async (url) => {
  const [state, axiosDispatch] = useReducer(reducerFunc, {
    data: null,
    status: "pending",
    error: null,
  });
  try {
    const data = await axios.get(url);
    axiosDispatch({ type: "started" });
    if (data.status === 200) {
      axiosDispatch({ type: "success", payload: data });
    }
  } catch (err) {
    axiosDispatch({ type: "error", payload: err });
    console.error(err);
  }

  return state;
};
