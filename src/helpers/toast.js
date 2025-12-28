import { Slide, toast } from "react-toastify";

export const toastSuccess = (message, position = "top-center") => {
  toast.success(message, {
    position: position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Slide,
  });
};

export const toastWarning = (message, position = "top-center") => {
  toast.warning(message, {
    position: position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Slide,
  });
};

export const toastError = (message, position = "top-center") => {
  toast.error(message, {
    position: position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Slide,
  });
};

export const toastInfo = (message, position = "top-center") => {
  toast.info(message, {
    position: position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Slide,
  });
};
