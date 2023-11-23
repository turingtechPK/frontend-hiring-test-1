"use client";

import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Style } from "./custom-modal.styles";
import type { CustomModalProps } from "./custom-modal.types";

export function CustomModal({
  isOpen,
  onClose,
  children,
  headerLabel,
  cancelButtonsProps,
  acceptButtonProps,
  acceptButtonLabel,
  closeButtonProps,
  headerTypographyProps,
  rootSx,
  footer,
}: CustomModalProps): JSX.Element {
  return (
    <Modal open={isOpen} onClose={onClose} closeAfterTransition>
      <Box width="100%" sx={Style.root(rootSx)}>
        <Box
          display="flex"
          justifyContent="center"
          alignContent="center"
          alignItems="center"
        >
          {headerLabel && (
            <Typography variant="h6" {...headerTypographyProps}>
              {headerLabel}
            </Typography>
          )}

          <IconButton sx={{ ml: "auto" }} {...closeButtonProps}>
            <CloseIcon />
          </IconButton>
        </Box>
        {children}
        {footer && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button {...cancelButtonsProps}>Cancel</Button>
            <Button {...acceptButtonProps}>{acceptButtonLabel}</Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
}
