import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { IconButton } from '@mui/material';

export default function DialogPassword() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
         <IconButton onClick={handleClickOpen}>
                <HelpOutlineIcon>
                </HelpOutlineIcon>
              </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <h3>Ayuda<HelpOutlineIcon/></h3> 
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           - La contraseña debe ser de longitud mínima 5, y debe contener letras mayúsculas, letras minúsculas y números, además
           las contraseñas deben coincidir.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            De acuerdo
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}