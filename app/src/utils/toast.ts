import { Flip, toast,  } from "react-toastify";

export const notifyError = (message: string) =>
  toast.error(message, {
    theme: "light",
    pauseOnHover: false,
    hideProgressBar: true,
    autoClose: 1000,
    toastId: "customId",
    transition: Flip,
    closeButton: false,
    position: "top-center",
  });

  export const notifySuccess = (message: string) =>
  toast.success(message, {
    theme: "light",
    pauseOnHover: false,
    hideProgressBar: true,
    autoClose: 1000,
    toastId: "customId",
    transition: Flip,
    closeButton: false,
    position: "top-center",
  });