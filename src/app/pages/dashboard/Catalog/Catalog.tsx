/** @format */

import React, { useState, MouseEvent } from "react";
import { styled } from "@mui/system";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import SearchBar from "../../../components/SearchBar";
import { CustomizedDialogs } from "../../../components/Popup";
import "./Catalog.scss";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

const StyledBox = styled(Box)({
  height: `77px`,
  display: `flex`,
  justifyContent: "space-between",
  alignItems: `center`,

  padding: `0 30px`,
  borderRadius: `50px`,
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  //...theme.typography.body2,
  padding: theme.spacing(1),
  boxShadow: "none",
  color: theme.palette.text.secondary,
}));

const Catalog = () => {
  const accordian = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [option, setOption] = useState("monthly");
  const handleChange = (event: MouseEvent<HTMLElement>, newColor: string) => {
    setOption(newColor);
  };
  const [payment, setPayment] = useState("monthly");
  const [isDisabled, setIsDisabled] = useState(true);
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState<number>(0);

  const min = 0;
  const max = 100;
  const IncrementItem = () => {
    setValue(value + 1);
  };
  const DecreaseItem = () => {
    if (value < 1) {
      setValue(0);
    } else {
      setValue(value - 1);
    }
  };

  const canBeSubmitted = () => {
    return checked ? setIsDisabled(true) : setIsDisabled(false);
  };

  const onCheckboxClick = () => {
    setChecked(!checked);
    return canBeSubmitted();
  };

  const paymenthandleChange = (event: SelectChangeEvent) => {
    setPayment(event.target.value as string);
  };

  const Modal = () => {
    return (
      <>
        <div>
          <form>
            <div className="modal-head">
              <Typography className="popup-head">
                <h3>Microsoft Office 365 E5</h3>
                <h5>MSRP: $75.00 / month</h5>
              </Typography>
            </div>
            <div className="popup-main">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography className="popup-field-label">
                    Renewal Term:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl>
                    <ToggleButtonGroup
                      color="primary"
                      exclusive
                      value={option}
                      onChange={handleChange}
                      aria-label="Platform"
                      className="toggle-button"
                    >
                      <ToggleButton className="renew-option" value="monthly">
                        Monthly
                      </ToggleButton>
                      <ToggleButton className="renew-option" value="annually">
                        Annually
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography className="popup-field-label">
                    Annual payment option:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={payment}
                      onChange={paymenthandleChange}
                      // defaultValue="monthly"
                      className="payment-select"
                    >
                      <MenuItem value="monthly">Monthly</MenuItem>
                      <MenuItem
                        disabled={option === "monthly"}
                        value="annually"
                      >
                        Annually
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography className="popup-field-label">
                    Quantity:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="set-quantity">
                    <Button
                      onClick={DecreaseItem}
                      className="quantity-minmax quantity-sub"
                    >
                      -
                    </Button>
                    <FormControl>
                      <TextField
                        type="number"
                        id="outlined-basic"
                        className="quantity-select"
                        inputProps={{ min, max }}
                        value={value}
                        onChange={(e) => {
                          var value = parseInt(e.target.value, 10);

                          if (value > max) value = max;
                          if (value < min) value = min;

                          setValue(value);
                        }}
                      />
                    </FormControl>
                    <Button
                      onClick={IncrementItem}
                      className="quantity-minmax quantity-add"
                    >
                      +
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </div>
            <Typography className="price-per-month">
              {`Your price: $ ${75.0 * value} / month`}
            </Typography>

            <div className="modal-item">
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox onClick={onCheckboxClick} />}
                      label="I agree to the Terms & Conditions"
                      className="checkbox"
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    id="add-btn"
                    className="submit-btn"
                    disabled={isDisabled}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </div>
          </form>
        </div>
      </>
    );
  };
  return (
    <div>
      <SearchBar />
      <div className="catalog-panel">
        <div className="panel-light">
          {accordian.map((i) => {
            return (
              <Accordion
                sx={{
                  marginBottom: `15px`,
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  borderRadius: `10px`,
                  boxShadow: `0px 6px 10px #00000017`,
                  border: "1px solid rgba(209, 210, 212, 1)",
                }}
                className="accordian"
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography
                    style={{ font: `normal normal 700 30px/60px Raleway` }}
                    className="accordian-item-heading"
                  >
                    Microsoft 365 E3
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  className="accordian-details"
                  sx={{ paddingBottom: `61px` }}
                >
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid
                      className="accordian-item-inner"
                      container
                      spacing={2}
                    >
                      <Grid className="item-inner-col" item xs={6} md={8}>
                        <Item>
                          <Typography
                            style={{
                              font: `normal normal normal 24px/38px Raleway`,
                              color: `#666666`,
                            }}
                            className="accordian-inner-para"
                          >
                            Microsoft 365 E3 combines best-in-class productivity
                            apps with core security and compliance capabilities.
                          </Typography>
                        </Item>
                      </Grid>

                      <Grid className="item-inner-col" item xs={12} md={8}>
                        <Item>
                          <StyledBox
                            className="item-mspr"
                            style={{ backgroundColor: `#FDF1E9` }}
                          >
                            <Typography
                              style={{
                                font: `normal normal 400 24px/44px Raleway`,
                                color: `#666666`,
                              }}
                            >
                              MSRP:
                            </Typography>

                            <Typography
                              style={{
                                font: `normal normal 400 24px/44px Raleway`,
                                color: `#666666`,
                              }}
                            >
                              $15.00 /user/month
                            </Typography>
                          </StyledBox>
                        </Item>
                      </Grid>

                      <Grid className="item-inner-col" item xs={12} md={8}>
                        <Item>
                          <StyledBox
                            className="item-mspr"
                            style={{ backgroundColor: `#F0F0F0` }}
                          >
                            <Typography
                              style={{
                                font: `normal normal 700 24px/44px Raleway`,
                                color: `#666666`,
                              }}
                            >
                              Client Discount:
                            </Typography>

                            <Typography
                              style={{
                                font: `normal normal 700 24px/44px Raleway`,
                                color: `#666666`,
                              }}
                            >
                              $13.50 /user/month
                            </Typography>
                          </StyledBox>
                        </Item>
                      </Grid>

                      <Grid className="item-inner-col" item xs={12} md={4}>
                        <Item sx={{ textAlign: `center` }}>
                          <div>
                            {/* <MSButton
                        text="Buy Subscription"
                        sx={{ backgroundColor: "#EE7623" }}
                      /> */}
                            <CustomizedDialogs dialogText="Buy Subscriptions" popupContent={Modal()} />
                            <Typography
                              style={{
                                font: `normal normal normal 16px/44px Raleway`,
                                color: `#666666`,
                              }}
                              className="accordian-last-para"
                            >
                              annual commitment required
                            </Typography>
                          </div>
                        </Item>
                      </Grid>
                    </Grid>
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
