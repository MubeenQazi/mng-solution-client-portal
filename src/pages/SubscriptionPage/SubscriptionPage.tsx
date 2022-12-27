/** @format */

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useLocation, useNavigate } from "react-router-dom";
import DownloadButton from "../../submodule/components/DownloadButton/DownloadButton";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchBar from "../../submodule/components/SearchBar/SearchBar";
import {
  stableSort,
  getComparator,
  Order,
} from "../../submodule/components/Tables/Table";
import { TableStyled } from "../../submodule/components/Tables/TableStyles";
import EnhancedTableHead from "../../submodule/components/Tables/TableHead";
import "./Subscription.scss";
import { SubscriptionData } from "../../submodule/components/Tables/TableData";
import axios from "axios";

interface Data {
  id: any;
  offer_name: any;
  quantity: any;
  commitment_end_date: any;
  term_duration: any;
  will_auto_renew: any;
  status: any;
  is_nce: any;
  // action: string;
}

const originalRows: Data[] = SubscriptionData;

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "offer_name",
    numeric: false,
    disablePadding: true,
    label: "Subscription",
  },
  {
    id: "quantity",
    numeric: false,
    disablePadding: true,
    label: "Quantity",
  },
  {
    id: "commitment_end_date",
    numeric: false,
    disablePadding: true,
    label: "Renews On",
  },
  {
    id: "term_duration",
    numeric: false,
    disablePadding: true,
    label: "Terms",
  },
  {
    id: "will_auto_renew",
    numeric: false,
    disablePadding: true,
    label: "Auto Renewel",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: true,
    label: "Status",
  },
];

const SubscriptionPage = () => {
  const [rows, setRows] = useState<Data[]>(originalRows);
  const [searched, setSearched] = useState<string>("");
  const [order, setOrder] = React.useState<Order>("desc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("offer_name");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_CLIENT_API_BASE}/subscriptions`)
      .then(function (response) {
        if (response.data) {
          setRows(response.data);
        }
      });
  }, []);

  const requestSearch = (searchedVal: string) => {
    const filteredRows = originalRows.filter((row) => {
      return row.offer_name.toLowerCase().includes(searchedVal.toLowerCase());
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
    "Offer ID",
    "Offer Name",
    "Offer Description",
    "Quantity",
    "Creation Date",
    "Effective Start Date",
    "Commitment End Date",
    "Cancellation Date",
    "Billing Cycle",
    "Billing Type",
    "Terms Duration",
    "Auto Renewal",
    "Is Trial",
    "Is NCE",
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
        <DownloadButton
          rows={rows}
          columns={columns}
          filename="subscription.csv"
        />
      </Box>
      <Box>
        <SearchBar value={searched} onChange={onChange} />
        <Paper sx={{ boxShadow: "none" }}>
          <TableContainer
            className="subscription-table-container"
            style={{ marginTop: "30px" }}
          >
            <TableStyled stickyHeader aria-label="sticky table">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                headCells={headCells}
              />

              <TableBody>
                {stableSort(rows, getComparator(order, orderBy)).map(
                  (row, index) => {
                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={row.id}
                        onClick={() => clickableRow(row)}
                      >
                        <TableCell className="table-col-1">
                          {row.is_nce && <span className="table-tag">NCE</span>}
                          {row.offer_name}
                        </TableCell>
                        <TableCell>{row.quantity}</TableCell>

                        <TableCell>{row.commitment_end_date}</TableCell>
                        <TableCell>{row.term_duration}</TableCell>

                        <TableCell>
                          {row.will_auto_renew ? "Yes" : "No"}
                        </TableCell>
                        <TableCell className={`ms-${row.status} `}>
                          {row.status}
                        </TableCell>
                      </TableRow>
                    );
                  }
                )}
              </TableBody>
            </TableStyled>
          </TableContainer>
        </Paper>
      </Box>
    </div>
  );
};

export default SubscriptionPage;
