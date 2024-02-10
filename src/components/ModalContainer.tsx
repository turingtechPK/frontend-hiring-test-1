import { useTheme } from '@/lib/hooks';
import { Box, Fade, Modal, SxProps, Theme } from '@mui/material';

export type ModalContainerProps = {
  modalDetails: ModalDetails;
  children?: JSX.Element;
  onClose?: () => void;
};

/**
 * Default styles for `ModalContainer`.
 * @param theme - Theme object.
 * @param {"md" | "lg"} width - Width of the modal.
 */
const modalStyle = (theme: Theme): SxProps<Theme> => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  px: 4,
  '& > .MuiPaper-root': {
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  [theme.breakpoints.up('sm')]: {
    width: '80%',
  },
  [theme.breakpoints.up('md')]: {
    width: '70%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '60%',
  },
  [theme.breakpoints.up('xl')]: {
    width: '50%',
  },
});

/**
 * `ModalContainer` component for displaying an overlay modal.
 * @param {ModalContainerProps} props - Object of type ModalProps.
 */
export function ModalContainer({ modalDetails, children, onClose }: ModalContainerProps) {
  const handleClose = () => {
    modalDetails.closeModal();
    onClose && onClose();
  };

  const theme = useTheme();

  return (
    <Modal open={modalDetails.isOpen} onClose={handleClose} aria-label={`modal-${modalDetails.title}`}>
      <Fade in={modalDetails.isOpen} unmountOnExit>
        <Box sx={modalStyle(theme)}>{children}</Box>
      </Fade>
    </Modal>
  );
}
