import { Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React from "react";
import axios from 'axios';
// todo: use package for notification bar
import Snackbar from '@mui/material/Snackbar';

const defaultValue = {
  email: "",
  phone: "",
  subject: "",
  message: "",
  contact: "Email",
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Todo: refactor
const ContactUsForm = ({ page }: { page: string }) => {
  const [formValues, setFormValues] = React.useState(defaultValue);
  const [open, setOpen] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  const handleInputChange = (e: any) => {
    const { name, value }: any = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setDisabled(true);

    const requestBody = {
      "source": "portal",
      "page": page,
      "data": {
        "Email": `${formValues.email}`,
        "Phone Number": `${formValues.phone}`,
        "Subject": `${formValues.subject}`,
        "Message": `${formValues.message}`,
        "How would you like us to contact you?": `${formValues.contact}`
      }
    }

    axios.post("https://api.msolcsptest.com/notify/v1/portalmessage", requestBody , {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    })
      .then(function (response) {
        setOpen(true);
        setDisabled(false);
        setFormValues(defaultValue);
      })
      .catch(function (error) {
        setOpen(false);
        setDisabled(false);
      });

  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Container>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={"success"} sx={{ width: '100%' }}>
          Message Send Successfully
        </Alert>
      </Snackbar>
      <h2 className="primary-heading">Send Us a Message</h2>

      <form onSubmit={handleSubmit}>
        <FormControl className="input-row">
          <TextField
            fullWidth
            required
            type="email"
            name="email"
            label="Your email address"
            variant="outlined"
            value={formValues.email}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl className="input-row">
          <TextField
            fullWidth
            required
            type="tel"
            name="phone"
            label="Your phone number"
            variant="outlined"
            value={formValues.phone}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl className="input-row">
          <TextField
            fullWidth
            required
            type="text"
            label="Subject"
            variant="outlined"
            name="subject"
            value={formValues.subject}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl className="input-row">
          <TextField
            fullWidth
            required
            label="Message"
            multiline
            rows={5}
            onChange={handleInputChange}
            name="message"
            value={formValues.message} />
        </FormControl>

        <div className="home-contact-option d-md-flex justify-content-between mt-30">
          <FormControl className="contact-radio-button">
            <FormLabel>How would you like us to contact you?</FormLabel>
            <RadioGroup row value={formValues.contact} name="contact" onChange={handleInputChange}>
              <FormControlLabel
                value="Email"
                control={<Radio />}
                label="Email"
              />
              <FormControlLabel
                value="Phone"
                control={<Radio />}
                label="Phone"
              />
            </RadioGroup>
          </FormControl>
          <Button type="submit" className="btn-rounded btn-mid" variant="contained" disabled={disabled}>
            Send Message
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default ContactUsForm;