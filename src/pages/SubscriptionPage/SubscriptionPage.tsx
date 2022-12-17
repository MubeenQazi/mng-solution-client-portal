import React, {useState} from "react";
import Box from "@mui/material/Box";
import {Link, useLocation, useNavigate} from "react-router-dom";
import DownloadButton from "../../components/DownloadButton/DownloadButton";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchBar from "../../components/SearchBar/SearchBar";
import {
  stableSort,
  getComparator,
  Order,
} from "../../components/Tables/Table";
import {TableStyled} from "../../components/Tables/TableStyles";
import {SubscriptionData} from "../../components/Tables/TableData";
import EnhancedTableHead from "../../components/Tables/TableHead";
import "./Subscription.scss";

interface Data {
  id: number;
  subscription: string;
  count: string;
  renewsOn: string;
  terms: string;
  autoRenewel: string;
  status: string;
  action: string;
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
    id: "subscription",
    numeric: false,
    disablePadding: true,
    label: "Subscription",
  },
  {
    id: "count",
    numeric: false,
    disablePadding: true,
    label: "Count",
  },
  {
    id: "renewsOn",
    numeric: false,
    disablePadding: true,
    label: "Renews On",
  },
  {
    id: "terms",
    numeric: false,
    disablePadding: true,
    label: "Terms",
  },
  {
    id: "autoRenewel",
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
  {
    id: "action",
    numeric: false,
    disablePadding: true,
    label: "Action",
  },
];


const SubscriptionPage = () => {
  const [rows, setRows] = useState<Data[]>(originalRows);
  const [searched, setSearched] = useState<string>("");
  const [order, setOrder] = React.useState<Order>("desc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("subscription");
  const location = useLocation();
  const navigate = useNavigate();

  const requestSearch = (searchedVal: string) => {
    const filteredRows = originalRows.filter((row) => {
      return row.subscription.toLowerCase().includes(searchedVal.toLowerCase());
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

  const clickableRow = (row: any) => {
    navigate(`detail/${row.id}`, {state: {...row, ...{activeSideBar: location.state?.activeSideBar}}});
  }

  return (
    <div>
      <Box sx={{textAlign: `right`, marginBottom: `30px`}}>
        <DownloadButton rows={rows} columns={columns} filename="subscription.csv"/>
      </Box>
      <Box>
        <SearchBar value={searched} onChange={onChange}/>
        <Paper sx={{boxShadow: "none"}}>
          <TableContainer
            className="subscription-table-container"
            style={{marginTop: "30px"}}
          >
            <TableStyled
              stickyHeader
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

                {stableSort(rows, getComparator(order, orderBy)).map(
                  (row, index) => {
                    return (
                      <TableRow hover tabIndex={-1} key={row.id} onClick={() => clickableRow(row)}>
                        <TableCell
                          className="table-col-1"
                        >
                          <span className="table-tag">NCE</span>{" "}
                          {row.subscription}
                        </TableCell>
                        <TableCell>{row.count}</TableCell>
                        <TableCell>{row.renewsOn}</TableCell>
                        <TableCell>{row.terms}</TableCell>
                        <TableCell>{row.autoRenewel}</TableCell>
                        <TableCell
                          className={`ms-${
                            row.status === "Active" ? "active" : "suspend"
                          } `}
                        >
                          {row.status}
                        </TableCell>
                        <TableCell className="action-btn">
                          <Link to={{pathname: `detail/${row.id}`}}
                                state={{...row, ...{activeSideBar: location.state?.activeSideBar}}}>
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

export default SubscriptionPage;