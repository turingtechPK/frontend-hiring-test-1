import React from "react";
import { Dialog, DialogTitle, DialogContent,  Button, Typography } from "@mui/material";
import styles from "./GenericModal.module.scss";

interface GenericModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  subHeading?: string;
}

const GenericModal: React.FC<GenericModalProps> = ({ isOpen, onClose, title, children, subHeading }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <div className={styles.modalHeader}>
          <Typography variant="h6">{title}</Typography>
          <Button onClick={onClose} className={styles.closeButton}>
            ✖
          </Button>
        </div>
      </DialogTitle>

      {subHeading && (
        <Typography variant="subtitle1" className={styles.subHeading}>
          Caller ID: {subHeading}
        </Typography>
      )}

      <DialogContent className={styles.modalBody}>{children}</DialogContent>

    
    </Dialog>
  );
};

export default GenericModal;
