import React from "react";

import { Box, Grid, Typography } from "@mui/material";
import { WarningIcon } from "@assets";
import { CustomModal } from "@components";
import type { ButtonProps } from "@mui/material";

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
}

interface WarningPromptProps {
  acceptButtonProps?: LoadingButtonProps;
  acceptButtonLabel?: string;
  heading: string;
  subTitle: string;
  modal: boolean;
  setModal: any;
}

export function WarningPrompt({
  acceptButtonProps,
  acceptButtonLabel,
  heading,
  subTitle,
  modal,
  setModal,
}: WarningPromptProps): JSX.Element {
  return (
    <>
      <CustomModal
        onClose={setModal}
        rootSx={{
          maxWidth: 500,
        }}
        closeButtonProps={{
          onClick: () => {
            setModal(false);
          },
        }}
        isOpen={modal}
        footer
        cancelButtonsProps={{
          size: "small",
          variant: "outlined",
          onClick: () => {
            setModal(false);
          },
        }}
        acceptButtonProps={{
          size: "small",
          variant: "contained",
          disableElevation: true,
          disableFocusRipple: true,
          disableTouchRipple: true,
          disableRipple: true,
          ...acceptButtonProps,
        }}
        acceptButtonLabel={acceptButtonLabel}
      >
        <Grid container>
          <Grid item xs={12}>
            <Box display="flex" flexDirection="column" gap={2} mb={2}>
              <Box
                gap={1}
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
              >
                <WarningIcon
                  sx={{
                    color: "warning.main",
                    fontSize: 35,
                  }}
                />
                <Typography variant="h4" sx={{ color: "text.primary" }}>
                  {heading}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "text.secondary" }}
                >
                  {subTitle}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CustomModal>
    </>
  );
}
