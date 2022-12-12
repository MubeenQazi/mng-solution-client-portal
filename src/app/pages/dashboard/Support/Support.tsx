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
} from "@mui/material";
import React from "react";
import "./Support.scss";
const Support = () => {
  return (
    <>
      <section className="about">
        <Container>
          <Grid
            className="support-first-sec"
            container
            spacing={2}
            marginTop={10}
          >
            <Grid className="support-banner-imgbox" item xs={12} md={6}>
              <img src={require("../../../../AppImages/SupportImg.png")} alt="support"  style={{width: "100%"}}/>
              <Grid item className="hour-imgbox">
                <img src={require("../../../../AppImages/24hour.png")} alt="hours" />
                <Typography className="hour-support">Support</Typography>
              </Grid>
              <Grid item className="support-setting">
                <img src={require("../../../../AppImages/setting.png")} alt="setting" />
              </Grid>
            </Grid>
            <Grid
              className="support-first-right"
              item
              xs={12}
              md={6}
              marginTop={5}
            >
              <Typography className="support-first-content">
                We have team members ready to assist you. If you need help with
                ordering or license management, please contact our Office 365
                service team
              </Typography>
              <Grid item className="support-email-box">
                <Grid item className="mail-img">
                  <img src={require("../../../../AppImages/email.png")} alt="email" />
                </Grid>
                <Typography className="first-sec-email">
                  <span>Email:</span>{" "}
                  <a href="mailto:0365@managedsolution.com">
                    0365@managedsolution.com
                  </a>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </section>
      <section>
        <Container>
          <h2 className="primary-heading-support">Send Us a Message</h2>

          <form>
            <FormControl className="input-row">
              <TextField
                fullWidth
                type="email"
                label="Your email address"
                variant="outlined"
              />
            </FormControl>
            <FormControl className="input-row">
              <TextField
                fullWidth
                type="tel"
                label="Your phone number"
                variant="outlined"
              />
            </FormControl>
            <FormControl className="input-row">
              <TextField
                fullWidth
                type="text"
                label="Subject"
                variant="outlined"
              />
            </FormControl>
            <FormControl className="input-row">
              <TextField fullWidth label="Message" multiline rows={5} />
            </FormControl>

            <div className="d-flex justify-content-between mt-30 contact-radio-box">
              <FormControl className="contact-radio-button">
                <FormLabel>How would you like us to contact you?</FormLabel>
                <RadioGroup row name="row-radio-buttons-group" defaultValue="email">
                  <FormControlLabel
                    value="email"
                    control={<Radio />}
                    label="Email"
                  />
                  <FormControlLabel
                    value="phone"
                    control={<Radio />}
                    label="Phone"
                  />
                </RadioGroup>
              </FormControl>
              <Button
                className="btn-rounded btn-mid btn-support"
                variant="contained"
              >
                Send Message
              </Button>
            </div>
          </form>
        </Container>
      </section>
    </>
  );
};

export default Support;
