import * as React from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Modal = ({
  title,
  content,
  footer,
  open,
  setOpen,
  size = "lg",
  escape = true,
  modalId,
  fullScreen = false,
  scroll = "paper",
  closeIcon = false,
  contentSx,
}) => {
  return (
    <Dialog
      onClose={setOpen}
      open={open}
      id={modalId}
      fullWidth={true}
      disableEscapeKeyDown={escape}
      fullScreen={fullScreen}
      maxWidth={size}
      scroll={scroll}
      TransitionComponent={Transition}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent sx={contentSx}>{content}</DialogContent>
      {footer && <DialogActions>{footer}</DialogActions>}
    </Dialog>
  );
};
