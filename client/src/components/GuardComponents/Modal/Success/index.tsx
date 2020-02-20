import React from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import { DialogContentText } from '@material-ui/core';

export interface SuccessDialogProps {
  classes?: Record<'paper', string>;
  id?: string;
  keepMounted?: boolean;
  content: any;
  open: boolean;
  onClose?: any;
  footer?: any;
}

export function SuccessDialog(props: SuccessDialogProps) {
  const { onClose, footer, content, open, ...other } = props;

  const handleOk = () => {
    onClose(true);
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="sm"
      aria-labelledby="success-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="success-dialog-title">Success</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {footer ? (
          footer
        ) : (
          <Button onClick={handleOk} color="primary">
            Ok
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
