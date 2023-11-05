import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
} from "@mui/material";
import { DialogContainer, DialogContentsContainer } from "./styles";

export const Modal = ({
  component,
  onConfirm,
  onClose,
  primaryButtonText,
  secondaryButtonText,
  open,
  maxWidth,
}) => (
  <DialogContainer>
    <Dialog maxWidth={maxWidth ?? "lg"} open={open} onClose={onClose}>
      <Grid container display="flex" flexDirection="column">
        <DialogContentsContainer item>
          <DialogContent style={{ overflowY: "initial" }}>
            {component}
          </DialogContent>
        </DialogContentsContainer>
        <DialogContentsContainer item>
          <DialogActions>
            <Grid container display="flex" flexDirection="row">
              {secondaryButtonText && (
                <Grid item>
                  <Button className="secondary-btn" onClick={onClose}>
                    {secondaryButtonText}
                  </Button>
                </Grid>
              )}
              <Grid item md={12}>
                <Button
                  sx={{ width: "100%" }}
                  variant="contained"
                  className="primary-btn"
                  onClick={onConfirm}
                >
                  {primaryButtonText}
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </DialogContentsContainer>
      </Grid>
    </Dialog>
  </DialogContainer>
);
