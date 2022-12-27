/** @format */

import React, { useState, MouseEvent, useEffect } from "react";
import { styled } from "@mui/system";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import SearchBar from "../../submodule/components/SearchBar/SearchBar";
import { BuySubsciptionCustomizedDialog } from "../../components/Dialog/Dialog";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AlertMessage from "../../submodule/components/AlertMessage/AlertMessage";
import "./Catalog.scss";
import axios from "axios";

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

const defaultValues: any = [
  {
    id: 1,
    name: "Microsoft 365 E3",
    description:
      "Microsoft 365 E3 combines best-in-class productivity apps with core security and compliance capabilities.",
    msrp_price: 100,
    discount_price: 90,
    billing_term_options: "p1m, p1ym, p1ya",
    has_auto_renew: true,
    is_nce: true,
    status: "active",
  },
];

const CatalogPage = () => {
  const [option, setOption] = useState("monthly");
  const [accordians, setAccordians] = useState(defaultValues);

  const [message, setMessage] = useState<string>("");
  const [alert, setAlert] = useState<boolean>(false);

  const handleChange = (event: MouseEvent<HTMLElement>, newColor: string) => {
    setOption(newColor);
  };
  const [isDisabled, setIsDisabled] = useState(true);
  const [checked, setChecked] = useState(false);

  const [billingCycle, setBillingCycle] = useState("monthly");
  const [termDuration, setTermDuration] = useState("P3Y");
  const [sku, setSku] = useState("1");
  const [quantity, setQuantity] = useState<number>(0);

  const handleClick = (id: number) => {
    axios
      .post(`${process.env.REACT_APP_CLIENT_API_BASE}/order`, {
        id,
        quantity,
        billingCycle,
        termDuration,
        sku,
      })
      .then((response) => {
        setMessage("success");
      })
      .catch(() => {
        setMessage("fail");
      });
    setAlert(true);
  };

  useEffect(() => {
    // console.log(process.env);
    // when the component is mounted, the alert is displayed for 5 seconds
    setTimeout(() => {
      setAlert(false);
    }, 5000);

    axios
      .get(`${process.env.REACT_APP_CLIENT_API_BASE}/offers`)
      .then(function (response) {
        if (response.data) {
          setAccordians(response.data);
        }
      });
  }, []);

  const min = 0;
  const max = 100;
  const IncrementItem = () => {
    setQuantity(quantity + 1);
  };
  const DecreaseItem = () => {
    if (quantity < 1) {
      setQuantity(0);
    } else {
      setQuantity(quantity - 1);
    }
  };

  const canBeSubmitted = () => {
    return checked ? setIsDisabled(true) : setIsDisabled(false);
  };

  const onCheckboxClick = () => {
    setChecked(!checked);
    return canBeSubmitted();
  };

  const billinghandleChange = (event: SelectChangeEvent) => {
    setBillingCycle(event.target.value as string);
  };

  const Modal = (id: number, name: string, msrp_price: string | number) => {
    return (
      <>
        <div>
          <form>
            <div className="modal-head">
              <div className="popup-head">
                <h3>{name}</h3>
                <h5>MSRP: ${msrp_price} / month</h5>
              </div>
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
                      value={billingCycle}
                      onChange={billinghandleChange}
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
                        value={quantity}
                        onChange={(e) => {
                          var value = parseInt(e.target.value, 10);

                          if (value > max) value = max;
                          if (value < min) value = min;

                          setQuantity(value);
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
              {`Your price: $ ${75.0 * quantity} / month`}
            </Typography>

            <div className="modal-item">
              <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox onClick={onCheckboxClick} />}
                      label="I agree to the Terms & Conditions"
                      className="checkbox"
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12} md={5}>
                  <Button
                    id="add-btn"
                    className="submit-btn"
                    disabled={isDisabled}
                    onClick={() => handleClick(id)}
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

      {message == "success"
        ? AlertMessage(alert, "Order Created Succefully", "success")
        : message == "fail" &&
          AlertMessage(alert, "Order Creation Failed", "error")}

      <div className="catalog-panel">
        <div className="panel-light">
          {accordians.map((accordian: any) => {
            return (
              <Accordion className="accordian" key={accordian.id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className="accordian-item-heading">
                    {accordian.name}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="accordian-details">
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid
                      className="accordian-item-inner"
                      container
                      spacing={2}
                    >
                      <Grid className="item-inner-col" item xs={6} md={8}>
                        <Item>
                          <Typography className="accordian-inner-para">
                            {accordian.description}
                          </Typography>
                        </Item>
                      </Grid>

                      <Grid className="item-inner-col" item xs={12} md={8}>
                        <Item>
                          <StyledBox className="item-mspr light">
                            <Typography className="item-label">
                              MSRP:
                            </Typography>

                            <Typography className="item-label">
                              ${accordian.msrp_price} /user/month
                            </Typography>
                          </StyledBox>
                        </Item>
                      </Grid>

                      <Grid className="item-inner-col" item xs={12} md={8}>
                        <Item>
                          <StyledBox className="item-mspr gray">
                            <Typography className="item-label-bold">
                              Client Discount:
                            </Typography>

                            <Typography className="item-label-bold">
                              ${accordian.discount_price} /user/month
                            </Typography>
                          </StyledBox>
                        </Item>
                      </Grid>

                      <Grid className="item-inner-col" item xs={12} md={4}>
                        <Item sx={{ textAlign: `center` }}>
                          <div>
                            <BuySubsciptionCustomizedDialog
                              dialogText="Buy Subscriptions"
                              popupContent={Modal(
                                accordian.id,
                                accordian.name,
                                accordian.msrp_price
                              )}
                            />
                            <Typography className="accordian-last-para">
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

export default CatalogPage;
