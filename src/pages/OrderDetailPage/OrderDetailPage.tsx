/** @format */

import React from "react";
import { Link, useLocation } from "react-router-dom";
import MsButton from "../../submodule/components/GlobalButton/MsButton";
import DownloadButton from "../../submodule/components/GlobalButton/DownloadButton";
import { styled } from "@mui/system";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  DOWNLOAD_COLUMNS_ORDER,
  ORDER_DETAIL_COLUMNS,
  MOBILE_COLUMNS_ORDER_DETAIL,
  TABLET_COLUMNS_ORDER_DETAIL,
  DESKTOP_COLUMNS_ORDER_DETAIL,
} from "../../components/TableColumns/ColumnResponsive";
import { Box, Paper, Grid, ListItem } from "@mui/material";

import TableGrid from "../../submodule/components/Tables/TableGrid";
import "../OrdersPage/Orders.scss";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "transparent",
  //...theme.typography.body2,
  padding: theme.spacing(1),
  boxShadow: "none",
  color: theme.palette.text.secondary,
}));

const OrderDetailPage = () => {
  const location = useLocation();
  const lineItems = location.state.line_items;

  return (
    <div>
      <Box
        className="d-md-flex justify-content-md-between align-items-md-center detail-box"
        sx={{
          marginBottom: `10px`,
        }}
      >
        <h1>
          Order Detail
          <span
            className={
              location.state.status === "Active" ? "ms-active" : "ms-suspend"
            }
          >
            ({location.state.status})
          </span>
        </h1>
        <DownloadButton
          rows={location.state.line_items}
          columns={DOWNLOAD_COLUMNS_ORDER}
          filename="orderDetail.csv"
        />
      </Box>
      <Box>
        <div className="panel-light">
          <Box className="d-md-flex justify-content-md-between align-items-md-center">
            <h2>Order ID: {location.state.id}</h2>
            <h4>{location.state.creation_date}</h4>
          </Box>

          <TableGrid
            gridRows={lineItems}
            gridColumns={ORDER_DETAIL_COLUMNS}
            gridDesktopColumns={DESKTOP_COLUMNS_ORDER_DETAIL}
            gridTabletColumns={TABLET_COLUMNS_ORDER_DETAIL}
            gridMobileColumns={MOBILE_COLUMNS_ORDER_DETAIL}
            gridClass="datagrid-table-detail"
          />

          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Item className="d-md-flex align-items-md-center">
                  <h3 className="ms-meta-title">Billing Plan: </h3>
                  <h3 className="ms-meta-data">
                    {location.state.billing_cycle}
                  </h3>
                </Item>
              </Grid>
              <Grid item xs={12} md={6}>
                <Item className="d-md-flex align-items-md-center justify-content-lg-end">
                  <h3 className="ms-meta-title">Monthly Payment: </h3>
                  <h3 className="ms-meta-data">
                    {" "}
                    ${location.state.monthly_price}{" "}
                  </h3>
                </Item>
              </Grid>

              <Grid item xs={12} md={6}>
                <Item className="d-md-flex align-items-md-center">
                  <h3 className="ms-meta-title">Currency: </h3>
                  <h3 className="ms-meta-data">
                    {location.state.currency_code}
                  </h3>
                </Item>
              </Grid>
              <Grid item xs={12} md={6}>
                <Item className="d-md-flex align-items-md-center justify-content-lg-end">
                  <h3 className="ms-meta-title">Order Total: </h3>
                  <h3 className="ms-meta-data">
                    ${location.state.total_price}{" "}
                  </h3>
                </Item>
              </Grid>
            </Grid>
          </Box>
        </div>
        <br></br>
        <div>
          <ListItem
            component={Link}
            to={"/dashboard/order"}
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

export default OrderDetailPage;
