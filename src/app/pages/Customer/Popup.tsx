/** @format */

import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
import "../auth/Login/Login.scss";
import MSButton from "../../components/Button";

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { Link } from "react-router-dom";
export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CancelIcon className="close-btn" />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export function CustomizedDialogs(validate: any) {
  const [open, setOpen] = useState(false);

    console.log(validate.validate);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        type="submit"
        size="small"
        style={{
          paddingLeft: `30px`,
        paddingRight: `30px`,
        height: `50px`,
          borderRadius: `50px`,
          textTransform: `inherit`,
          font: `normal normal 500 20px/80px Raleway`,
        }}
        variant="contained"
        onClick={handleClickOpen}
        className="buy-sub"
      >
        Get A Quote
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        />
          <form style={{ minWidth: 300, textAlign: 'center' }}>
        <DialogContent className="popup-content">            
            <div className="modal-head d-flex align-items-center justify-content-center">
              {
                validate.validate ? 
                  <CheckCircleOutlineIcon className="success icon" /> 
                  :
                  <HighlightOffIcon  className="danger icon" />
              }
            </div>
              <div className="modal-body">
              <h1>{validate.validate ? 'Success' : 'Error'}</h1>
              <p>{validate.validate ? 'You have successfully submitted the quotation request' : 'Please fill out all of the mandatory fields.'}</p>
              </div>
            
            <div className="modal-item">
                
                {validate.validate ?
                  <Link to={'/'}>
                    <MSButton text="Ok" />
                  </Link>
                  :
                  <MSButton text="Ok" clickAction={handleClose} />
                }
              </div>
            </DialogContent>
              
          </form>
      </BootstrapDialog>
    </div>
  );
}
