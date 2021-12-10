import "./ToastMessage.css";
import { useState, useEffect } from "react";
const ToastMessage = ({ message, setShowToast }) => {
  // const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // setShowToast(true);
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, [message]);
  return (
    <div class="alert primary--alert">
      <p>{message}</p>
    </div>
  );
};

export default ToastMessage;
