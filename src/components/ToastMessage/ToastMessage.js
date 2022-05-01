import "./ToastMessage.css";
import { useEffect } from "react";
const ToastMessage = ({ message, setShowToast }) => {
  useEffect(() => {
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
