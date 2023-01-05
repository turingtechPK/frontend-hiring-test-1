import Swal from "sweetalert2";

export function ShowLoader(props) {
    Swal.fire({
        text: props
   });
   Swal.showLoading();
}