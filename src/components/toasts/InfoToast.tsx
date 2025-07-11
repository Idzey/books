import { toast } from "react-toastify";

export default function InfoToast(text: string) {
  toast.info(text, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
}
