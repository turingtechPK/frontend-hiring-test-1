import type { ButtonProps, TypographyProps } from "@mui/material";
import type { Dispatch, ReactNode, SetStateAction } from "react";

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
}

export interface CustomModalProps {
  isOpen: boolean;
  onClose?: Dispatch<SetStateAction<boolean>>;
  headerLabel?: string;
  acceptButtonLabel?: string;
  footer?: boolean;
  children?: ReactNode;
  cancelButtonsProps?: ButtonProps;
  acceptButtonProps?: LoadingButtonProps;
  closeButtonProps?: ButtonProps;
  headerTypographyProps?: TypographyProps;
  rootSx?: object | undefined;
}
