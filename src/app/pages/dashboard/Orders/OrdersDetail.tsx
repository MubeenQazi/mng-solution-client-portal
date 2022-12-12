/** @format */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import MSButton from "../../../components/Button";
import DownloadButton from "../../../components/DownloadButton";
import { styled } from "@mui/system";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ListItem from "@mui/material/ListItem";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { CsvBuilder } from "filefy";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "transparent",
  //...theme.typography.body2,
  padding: theme.spacing(1),
  boxShadow: "none",
  color: theme.palette.text.secondary,
}));

function createData(
  sku: string,
  item: string,
  term: string,
  unitPrice: number,
  quantity: number
) {
  return { sku, item, unitPrice, term, quantity };
}

const OrdersDetail = () => {
  const location = useLocation();
  const lineItems = location.state.lineItem;

  const columns = ["ID", "Date", "Count", "Item", "Price", "Co Term", "Status"];
  return (
    <div>
      <Box
        className="d-md-flex justify-content-md-between align-items-md-center"
        sx={{
          marginBottom: `10px`,
        }}
      >
        <h1>
          {location.state.item}{" "}
          <span
            className={
              location.state.status == "Active" ? "ms-active" : "ms-suspend"
            }
          >
            ({location.state.status})
          </span>
        </h1>
        <DownloadButton rows={ location.state.lineItem } columns={columns} filename="orderDetail.csv" />
      </Box>
      <Box sx={{ marginTop: `30px` }}>
        <div className="panel-light">
          <Box className="d-md-flex justify-content-md-between align-items-md-center">
            <h2>Order ID: {location.state.id}</h2>
            <h4>{location.state.date}</h4>
          </Box>
          <TableContainer className="order-table-container">
            <Table
              sx={{
                marginBottom: `50px`,
                [`& .${tableCellClasses.root}`]: {
                  borderBottom: "none",
                },
                "& .MuiTableHead-root": {
                  backgroundColor: "tranparent",
                  "& .MuiTableCell-root": {
                    font: "normal normal 500 24px/36px Raleway",
                    letterSpacing: "0.32px",
                  },
                },
                "& .MuiTableBody-root": {
                  "& .MuiTableCell-root": {
                    font: "normal normal normal 24px/36px Raleway",
                    letterSpacing: "0px",
                  },
                },
              }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ textDecoration: "underline" }}>
                    SKU
                  </TableCell>
                  <TableCell
                    sx={{ textDecoration: "underline" }}
                    align="center"
                  >
                    Quantity
                  </TableCell>
                  <TableCell sx={{ textDecoration: "underline" }}>
                    Item
                  </TableCell>
                  <TableCell
                    sx={{ textDecoration: "underline" }}
                    align="center"
                  >
                    Unit Price
                  </TableCell>
                  <TableCell
                    sx={{ textDecoration: "underline" }}
                    align="center"
                  >
                    Term
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lineItems.map((lineItem: any) => (
                  <TableRow
                    key={lineItem.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      {lineItem.sku}
                    </TableCell>
                    <TableCell align="center">{lineItem.quantity}</TableCell>
                    <TableCell>{lineItem.item}</TableCell>
                    <TableCell align="center">{lineItem.unitPrice}</TableCell>
                    <TableCell align="center">{lineItem.term}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Item className="d-md-flex align-items-md-center">
                  <h3 className="ms-meta-title">Billing Plan: </h3>
                  <h3 className="ms-meta-data">{location.state.billingPlan}</h3>
                </Item>
              </Grid>
              <Grid item xs={12} md={6}>
                <Item className="d-md-flex align-items-md-center justify-content-lg-end">
                  <h3 className="ms-meta-title">Monthly Payment: </h3>
                  <h3 className="ms-meta-data"> ${location.state.monthlyPayment} </h3>
                </Item>
              </Grid>

              <Grid item xs={12} md={6}>
                <Item className="d-md-flex align-items-md-center">
                  <h3 className="ms-meta-title">Term Duration: </h3>
                  <h3 className="ms-meta-data">{location.state.termDuration}</h3>
                </Item>
              </Grid>
              <Grid item xs={12} md={6}>
                <Item className="d-md-flex align-items-md-center justify-content-lg-end">
                  <h3 className="ms-meta-title">Order Total: </h3>
                  <h3 className="ms-meta-data">${location.state.orderTotal} </h3>
                </Item>
              </Grid>
            </Grid>
          </Box>
        </div>
        <br></br>
        <div>
          <ListItem component={Link} to={"/dashboard/order"} state={{activeSideBar: location.state?.activeSideBar}}>
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

export default OrdersDetail;
