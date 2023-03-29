import { Flip, toast } from "react-toastify";

export const notifyPromisse = (
  request: Function,
  pending: string,
  success: string,
  error: string
) =>
  toast.promise(
    request(),
    {
      pending: pending,
      success: success,
      error: error,
    },
    {
      theme: "light",
      pauseOnHover: false,
      hideProgressBar: true,
      autoClose: 1000,
      toastId: "customId",
      transition: Flip,
      closeButton: false,
      position: "top-center",
    }
  );
