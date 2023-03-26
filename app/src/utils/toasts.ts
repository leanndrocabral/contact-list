import { toast, Zoom } from "react-toastify";

export const notify = (message: string) =>
  toast.error(message, {
    theme: "light",
    pauseOnHover: false,
    hideProgressBar: true,
    autoClose: 1000,
    toastId: "customId",
    transition: Zoom,
    closeButton: false,
  });
