/** @format */

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import DownloadButton from "../../submodule/components/DownloadButton/DownloadButton";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchBar from "../../submodule/components/SearchBar/SearchBar";
import "./Orders.scss";
import {
  stableSort,
  getComparator,
  Order,
} from "../../submodule/components/Tables/Table";
import { TableStyled } from "../../submodule/components/Tables/TableStyles";
import EnhancedTableHead from "../../submodule/components/Tables/TableHead";
import { OrderData } from "../../submodule/components/Tables/TableData";
import axios from "axios";

interface Data {
  id: any;
  creation_date: any;
  billing_cycle: any;
  monthly_price: any;
  total_price: any;
  status: any;
  // action: any;
}
const originalRows: Data[] = OrderData;
interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}
// HeadCell;

const headCells: readonly HeadCell[] = [
  {
    id: "creation_date",
    numeric: false,
    disablePadding: true,
    label: "Date",
  },
  {
    id: "billing_cycle",
    numeric: false,
    disablePadding: true,
    label: "Billing Cycle",
  },
  {
    id: "monthly_price",
    numeric: true,
    disablePadding: true,
    label: "Montly Price",
  },
  {
    id: "total_price",
    numeric: false,
    disablePadding: true,
    label: "Total Price",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: true,
    label: "Status",
  },
];

const OrdersPage = () => {
  const [rows, setRows] = useState<Data[]>(originalRows);
  const [searched, setSearched] = useState<string>("");
  const [order, setOrder] = React.useState<Order>("desc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("creation_date");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_CLIENT_API_BASE}/orders`)
      .then(function (response) {
        if (response.data) {
          setRows(response.data);
        }
      });
  }, []);

  const requestSearch = (searchedVal: string) => {
    const filteredRows = originalRows.filter((row) => {
      return row.total_price.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "desc";
    setOrder(isAsc ? "asc" : "desc");
    setOrderBy(property);
  };

  const onChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSearched(event.target.value as string);
    requestSearch(event.target.value as string);
  };

  const columns = [
    "ID",
    "Customer ID",
    "Data",
    "Line Items",
    "Currency Code",
    "Billing Cycle",
    "Monthly Price",
    "Total Price",
    "Status",
  ];
  const clickableRow = (row: any) => {
    navigate(`detail/${row.id}`, {
      state: { ...row, ...{ activeSideBar: location.state?.activeSideBar } },
    });
  };

  return (
    <div>
      <Box sx={{ textAlign: `right`, marginBottom: `30px` }}>
        <DownloadButton rows={rows} columns={columns} filename="order.csv" />
      </Box>
      <Box>
        <SearchBar value={searched} onChange={onChange} />
        <Paper sx={{ boxShadow: "none" }}>
          <TableContainer
            className="order-table-container"
            style={{ marginTop: "30px" }}
          >
            <TableStyled
              stickyHeader
              //className={classes.table}
              aria-label="sticky table"
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                headCells={headCells}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy)).map((row) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.id}
                      onClick={() => clickableRow(row)}
                    >
                      <TableCell>{row.creation_date}</TableCell>
                      <TableCell>{row.billing_cycle}</TableCell>
                      <TableCell>{row.monthly_price}</TableCell>
                      <TableCell>{row.total_price}</TableCell>
                      <TableCell
                        className={`ms-${
                          row.status === "Active" ? "active" : "suspend"
                        }`}
                      >
                        {row.status}
                      </TableCell>
                      <TableCell className="action-btn">
                        <Link
                          to={{ pathname: `detail/${row.id}` }}
                          state={{
                            ...row,
                            ...{ activeSideBar: location.state?.activeSideBar },
                          }}
                        >
                          View Details
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </TableStyled>
          </TableContainer>
        </Paper>
      </Box>
    </div>
  );
};

export default OrdersPage;
