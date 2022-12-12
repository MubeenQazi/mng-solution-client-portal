/** @format */
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import DownloadButton from "../../../components/DownloadButton";
import { styled } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import SearchBar from "../../../components/SearchBar";
import "./Order.scss";
import {
  stableSort,
  getComparator,
  descendingComparator,
  Order,
} from "../../../components/Tables/Table";
import { TableStyled } from "../../../components/Tables/TableStyles";
import {
  OrderData,
  OrderHeadCells,
} from "../../../components/Tables/TableData";
import EnhancedTableHead from "../../../components/Tables/TableHead";

interface Data {
  id: number;
  date: string;
  count: string;
  item: string;
  price: string;
  coTerm: string;
  status: string;
  action: string;
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
    id: "date",
    numeric: false,
    disablePadding: true,
    label: "Date",
  },
  {
    id: "count",
    numeric: true,
    disablePadding: true,
    label: "Count",
  },
  {
    id: "item",
    numeric: false,
    disablePadding: true,
    label: "Item",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: true,
    label: "Price",
  },
  {
    id: "coTerm",
    numeric: false,
    disablePadding: true,
    label: "Co Term",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: true,
    label: "Status",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: true,
    label: "Action",
  },
];



const Orders = () => {
  const [rows, setRows] = useState<Data[]>(originalRows);
  const [searched, setSearched] = useState<string>("");
  const [order, setOrder] = React.useState<Order>("desc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("date");
  const location = useLocation();
  const navigate = useNavigate();
  //console.log(location)


  const requestSearch = (searchedVal: string) => {
    const filteredRows = originalRows.filter((row) => {
      return row.item.toLowerCase().includes(searchedVal.toLowerCase());
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
        "Date", 
        "Count", 
        "Item", 
        "Price", 
        "Co-Term", 
    "Status",
    "Line Item",
        "Billing Plan",
"Term Duration",
"Monthly Payment",
"Order Total"
  ];
  const clickableRow = (row: any) => {
    navigate(`detail/${row.id}`, { state: { ...row, ...{ activeSideBar: location.state?.activeSideBar } } });
  }

  
  return (
    <div>
      <Box sx={{ textAlign: `right`, marginBottom: `30px` }}>
        <DownloadButton rows={ rows } columns={columns} filename="order.csv" />
      </Box>
      <Box>
        <SearchBar value={searched} onChange={onChange} />
        <Paper sx={{ boxShadow: "none" }}>
          <TableContainer
            className="order-table-container"
            style={{ marginTop: "30px", maxHeight: 500 }}
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
                headCells= {headCells}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy)).map(
                  (row, index) => {
                    return (
                      <TableRow hover tabIndex={-1} key={row.id} onClick={() => clickableRow(row)}>
                        <TableCell>
                          {row.date}
                        </TableCell>
                        <TableCell>{row.count}</TableCell>
                        <TableCell>{row.item}</TableCell>
                        <TableCell>{row.price}</TableCell>
                        <TableCell>{row.coTerm}</TableCell>
                        <TableCell
                          className={`ms-${
                            row.status === "Active" ? "active" : "suspend"
                          }`}
                        >
                          {row.status}
                        </TableCell>
                        <TableCell className="action-btn">
                          <Link to={{ pathname: `detail/${row.id}` }} state={{...row, ...{activeSideBar: location.state?.activeSideBar}}}>
                            {row.action}
                          </Link>
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

export default Orders;
