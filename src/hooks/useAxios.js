import axios from "axios";
import { useEffect, useState } from "react";

const useAxios = ({ url }) => {
  const [networkCall, setNetworkCall] = useState([]);
  useEffect(() => {
    function networkCall() {
      const { data } = axios.get(url);
      setNetworkCall([...networkCall, data]);
    }
    networkCall();
  }, []);

  return null;
};

export default useAxios;
