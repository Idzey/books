import { toast } from "react-toastify";

export default function ErrorToast(text: string) {
  toast.error(text, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
}
