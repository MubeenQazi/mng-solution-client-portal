import {
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import ContactUs from "../../submodule/components/ContactUsForm/ContactUsForm";
import {AppImages} from "../../shared/images";
import "./Support.scss";

const { supportImg, email, hour24, setting } = AppImages;

const SupportPage = () => {
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
              <img src={supportImg} alt="support"  style={{width: "100%"}}/>
              <Grid item className="hour-imgbox">
                <img src={hour24} alt="hours" />
                <Typography className="hour-support">Support</Typography>
              </Grid>
              <Grid item className="support-setting">
                <img src={setting} alt="setting" />
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
                  <img src={email} alt="email" />
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
        <ContactUs page="support" />
      </section>
    </>
  );
};

export default SupportPage;