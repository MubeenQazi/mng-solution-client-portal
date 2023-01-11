/** @format */

import React, { useState, useEffect } from "react";
import MsButton from "../../submodule/components/GlobalButton/MsButton";
import DownloadButton from "../../submodule/components/GlobalButton/DownloadButton";
import AlertMessage from "../../submodule/components/AlertMessage/AlertMessage";
import { styled } from "@mui/system";
import {
  Box,
  Paper,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  ListItem,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link, useLocation } from "react-router-dom";
import { SubscriptionPostApi } from "../../api/SubscriptionApi";
import { DOWNLOAD_COLUMNS_SUBSCRIPTION } from "../../components/TableColumns/ColumnResponsive";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  //...theme.typography.body2,
  padding: theme.spacing(1),
  boxShadow: "none",
  color: theme.palette.text.secondary,
}));

const SubscriptionDetailPage = () => {
  const [message, setMessage] = useState<string>("");
  const [alert, setAlert] = useState<boolean>(false);

  const location = useLocation();
  const subscriptionDetail = location.state;

  const subscriptionDetailArr = [];
  subscriptionDetailArr.push(subscriptionDetail);

  const id = location.state.id;
  const [value, setValue] = React.useState(
    location.state != null ? location.state.will_auto_renew : false
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (SubscriptionPostApi(id, value)) {
      setMessage("success");

      setAlert(true);
      setValue((event.target as HTMLInputElement).value);

      location.state.will_auto_renew = value;
    } else {
      setMessage("fail");
      setAlert(true);
      setValue((event.target as HTMLInputElement).value);
    }
  };

  useEffect(() => {
    // when the component is mounted, the alert is displayed for 5 seconds
    setTimeout(() => {
      setAlert(false);
      setMessage("");
    }, 5000);
  }, []);

  return (
    <div>
      {message === "success"
        ? AlertMessage(alert, "Subscription Updated Succefully", "success")
        : message === "fail" &&
          AlertMessage(alert, "Subscription Updated Failed", "error")}
      <Box
        className="d-md-flex justify-content-md-between align-items-md-center"
        sx={{
          marginBottom: `10px`,
        }}
      >
        <h1>
          {location.state.offer_name}{" "}
          <span
            className={
              location.state.status === "Active" ? "ms-active" : "ms-suspend"
            }
          >
            ({location.state.status})
          </span>
        </h1>
        <DownloadButton
          rows={subscriptionDetailArr}
          columns={DOWNLOAD_COLUMNS_SUBSCRIPTION}
          filename="subscriptionDetail.csv"
        />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={5}>
            <Item className="d-md-flex align-items-md-center">
              <h3 className="ms-meta-title">Quantity: </h3>
              <h3 className="ms-meta-data"> {location.state.quantity}</h3>
            </Item>
          </Grid>
          <Grid item xs={12} md={6} lg={7}>
            <Item className="d-md-flex align-items-md-center">
              <h3 className="ms-meta-title">Subscriptions Period: </h3>
              <h3 className="ms-meta-data"> {location.state.billing_cycle}</h3>
            </Item>
          </Grid>

          <Grid item xs={12} md={6} lg={5}>
            <Item className="d-md-flex align-items-md-center">
              <h3 className="ms-meta-title">Auto-Renewal: </h3>
              <RadioGroup
                row
                value={value}
                onChange={handleChange}
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Enable"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="Disable"
                />
              </RadioGroup>
            </Item>
          </Grid>
          <Grid item xs={12} md={6} lg={7}>
            <Item className="d-md-flex align-items-md-center">
              <h3 className="ms-meta-title">Subscriptions Type: </h3>
              <h3 className="ms-meta-data">{location.state.billing_type} </h3>
            </Item>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ marginTop: `30px` }}>
        <div className="panel-light">
          <h2>Description</h2>
          <p className="ms-description-summary">
            {location.state.offer_description}
          </p>
        </div>
        <br></br>
        <div>
          <ListItem
            component={Link}
            to={"/subscription"}
            state={{ activeSideBar: location.state?.activeSideBar }}
          >
            <MsButton
              text="Back"
              backgroundColor="#9BA4AF"
              icon={<ArrowBackIosIcon />}
            />
          </ListItem>
        </div>
      </Box>
    </div>
  );
};

export default SubscriptionDetailPage;
