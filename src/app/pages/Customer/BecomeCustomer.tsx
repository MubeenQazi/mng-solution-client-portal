/** @format */
import React, { useState } from "react";
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  MenuItem,
  Select,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import MSButton from "../../components/Button";

import { CustomizedDialogs } from "./Popup";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ListItem from "@mui/material/ListItem";
import "./Customer.scss";
import Footer from "../../components/Footer/Footer";

const defaultValues:any = {
  fname: "",
  lname: "",
  email: "",
  phone: "",
  noofemployee: "",
  hearaboutus: "",
};

const BecomeCustomer = () => {
  const [validation, setValidation] = useState(false);
  const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e: any) => {
    const { name, value }: any = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (Object.values(formValues).every((x:any) => x !== '')) { 
      setValidation(true);
    } else {
      setValidation(false);
    }
  } 

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      className="vh-100 become-customer-bg"
    >
      <Grid item>
        <div className="become-customer">
           <img
            className="customer-logo"
            src={require("../../../AppImages/logo.png")}
          />
        <form className="customerForm" onSubmit={handleSubmit}>
            <h1 className="customer-heading">
              <b>Become a Customer</b>
            </h1>
            <br />
            <Box sx={{ flexGrow: 1 }}>
          <Grid container direction="row" spacing={2}>
                <Grid item xs={12} md={6}>
                  <div>
              <FormLabel className="d-block">
                First Name <span className="danger">*</span>
              </FormLabel>
              <TextField
                fullWidth
                id="fname-input"
                name="fname"
                type="text"
                onChange={handleInputChange}
                    />
                  </div>
                  
            </Grid>

            <Grid item xs={12} md={6}>
              <FormLabel className="d-block">
                Last Name <span className="danger">*</span>
              </FormLabel>
              <TextField
                fullWidth
                id="lname-input"
                name="lname"
                type="text"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormLabel className="d-block">
                Email <span className="danger">*</span>
              </FormLabel>
              <TextField
                fullWidth
                id="email-input"
                name="email"
                type="email"
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormLabel className="d-block">
                Phone number <span className="danger">*</span>
              </FormLabel>
              <TextField
                fullWidth
                id="phone-input"
                name="phone"
                type="text"
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <FormLabel className="d-block">
                Number of Employees <span className="danger">*</span>
              </FormLabel>
              <FormControl fullWidth>
                <Select name="noofemployee" onChange={handleInputChange}>
                  <MenuItem key="20-50" value="20-50">
                    20-50
                  </MenuItem>
                  <MenuItem key="50-100" value="50-100">
                    50-100
                  </MenuItem>
                  <MenuItem key="100-250" value="100-250">
                    100-250
                  </MenuItem>
                  <MenuItem key="250-500" value="250-500">
                    250-500
                  </MenuItem>
                  <MenuItem key="500-1000" value="500-1000">
                    500-1000
                  </MenuItem>
                  <MenuItem key="1000+" value="1000+">
                    1000+
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12}>
              <FormLabel className="d-block">
                How Did You Hear About Us <span className="danger">*</span>
              </FormLabel>
              <FormControl fullWidth>
                <Select
                      name="hearaboutus"
                      
                onChange={handleInputChange}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "center",
                    },
                  }}
                >
                  <MenuItem key="broucher-post-card" value="broucher-post-card">
                    Brochure/Post Card
                  </MenuItem>
                  <MenuItem key="email" value="email">
                    Email
                  </MenuItem>
                  <MenuItem key="google" value="google">
                    Google
                  </MenuItem>
                  <MenuItem key="event" value="event">
                    Event
                  </MenuItem>
                  <MenuItem key="referral" value="referral">
                    Referral
                  </MenuItem>
                  <MenuItem key="1000+" value="1000+">
                    Inspire Confrence
                  </MenuItem>
                  <MenuItem key="microsoft" value="microsoft">
                    Microsoft
                  </MenuItem>

                  <MenuItem key="facebook" value="facebook">
                    Facebook
                  </MenuItem>

                  <MenuItem key="linkedin" value="linkedin">
                    LinkedIn
                  </MenuItem>

                  <MenuItem key="twitter" value="twitter">
                    Twitter
                  </MenuItem>

                  <MenuItem key="other" value="other">
                    Other
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
              </Grid>
              </Box>

          <Grid container spacing={1} justifyContent="center" sx={{ marginTop: "10px" }}>
              <Grid item md={6}>
              <ListItem
                component={Link}
                to={"/"}
              >
                <MSButton
                  text="Back"
                  backgroundColor="#9BA4AF"
                  icon={<ArrowBackIosIcon />}
                />
              </ListItem>
              </Grid>
              
              <Grid item md={6}>
              {/* <ListItem
                component={Link}
                  to={"/"}
                  className="justify-content-sm-end"
                > */}
                <div className="d-flex justify-content-sm-end">
                  <CustomizedDialogs validate={validation} />
                </div>
                {/* <MSButton text="Get A Quote" clickAction={Modal} /> */}
              {/* </ListItem> */}
              </Grid>
          </Grid>
          </form>
          </div>
      </Grid>

      <Footer />
    </Grid>
  );
};
export default BecomeCustomer;
