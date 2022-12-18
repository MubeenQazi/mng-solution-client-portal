import React from "react";
import Box from "@mui/material/Box";
import MSButton from "../../submodule/components/MSButton/MSButton";
import DownloadButton from "../../submodule/components/DownloadButton/DownloadButton";
import { styled } from "@mui/system";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ListItem from "@mui/material/ListItem";
import { Link, useLocation } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  //...theme.typography.body2,
  padding: theme.spacing(1),
  boxShadow: "none",
  color: theme.palette.text.secondary,
}));

const SubscriptionDetailPage = () => {
  const location = useLocation();
  const subscriptionDetail =  location.state;

  const subscriptionDetailArr = [];
  subscriptionDetailArr.push(subscriptionDetail);

  const [value, setValue] = React.useState(
    location.state != null ? location.state.autoRenewel : "Yes"
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const columns = [
    "ID",
    "Subscription",
    "Count",
    "Renews On",
    "Terms",
    "Auto Renewel",
    "Status",
    "Type",
    "Description",
    "List"
  ];

  return (
    <div>
      <Box
        className="d-md-flex justify-content-md-between align-items-md-center"
        sx={{
          marginBottom: `10px`,
        }}
      >
        <h1>
          {location.state.subscription}{" "}
          <span
            className={
              location.state.status === "Active" ? "ms-active" : "ms-suspend"
            }
          >
            ({location.state.status})
          </span>
        </h1>
        <DownloadButton rows={ subscriptionDetailArr } columns={columns} filename="subscriptionDetail.csv" />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={5}>
            <Item className="d-md-flex align-items-md-center">
              <h3 className="ms-meta-title">Quantity: </h3>
              <h3 className="ms-meta-data"> {location.state.count}</h3>
            </Item>
          </Grid>
          <Grid item xs={12} md={6} lg={7}>
            <Item className="d-md-flex align-items-md-center">
              <h3 className="ms-meta-title">Subscriptions Period: </h3>
              <h3 className="ms-meta-data">
                {" "}
                {location.state.subscriptionPeriod}
              </h3>
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
                  value="Yes"
                  control={<Radio />}
                  label="Enable"
                />
                <FormControlLabel
                  value="No"
                  control={<Radio />}
                  label="Disable"
                />
              </RadioGroup>
            </Item>
          </Grid>
          <Grid item xs={12} md={6} lg={7}>
            <Item className="d-md-flex align-items-md-center">
              <h3 className="ms-meta-title">Subscriptions Type: </h3>
              <h3 className="ms-meta-data">{location.state.type} </h3>
            </Item>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ marginTop: `30px` }}>
        <div className="panel-light">
          <h2>Description</h2>
          <p className="ms-description-summary">
            {location.state.description}
          </p>
          <div dangerouslySetInnerHTML={{__html: location.state.descriptionList}} />
        </div>
        <br></br>
        <div>
          <ListItem component={Link} to={"/subscription"}  state={{activeSideBar: location.state?.activeSideBar}}>
            <MSButton
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