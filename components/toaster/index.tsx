import { Toaster as HotToaster } from "react-hot-toast";
import { useTheme } from "@mui/material/styles";
import { alpha } from "@mui/system/colorManipulator";
import { ToastErrorIcon, ToastSuccessIcon } from "@assets";

export function Toaster(): JSX.Element {
  const {
    palette: { success, error, common, neutral },
  } = useTheme();

  return (
    <HotToaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        duration: 5000,
        success: {
          icon: <ToastSuccessIcon />,
          style: {
            background: success.main,
          },
        },
        error: {
          icon: <ToastErrorIcon />,
          style: {
            background: error.main,
          },
        },
        style: {
          borderRadius: "4px",
          background: alpha(neutral[900], 0.8),
          color: common.white,
          boxShadow: `0px 6px 20px 0px ${alpha(common.black, 0.3)}`,
          padding: "12px",
          fontSize: "14px",
          fontWeight: 600,
        },
      }}
    />
  );
}
