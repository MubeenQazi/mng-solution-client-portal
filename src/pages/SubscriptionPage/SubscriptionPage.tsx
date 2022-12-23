/** @format */

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DownloadButton from "../../submodule/components/DownloadButton/DownloadButton";

import Paper from "@mui/material/Paper";
import SearchBar from "../../submodule/components/SearchBar/SearchBar";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import "./Subscription.scss";
import axios from "axios";

const defaultValues: any = [
  {
    id: "924671ba-eab9-45d7-95ed-dbd9477f182b",
    offer_id: "DG7GMGF0FKZV:0003:DG7GMGF0DQLM",
    offer_name: "SQL Server Enterprise - 2 Core License Pack - 3 year",
    offer_description:
      "Microsoft 365 E3 combines best-in-class productivity apps with core security and compliance capabilities.",
    quantity: 1,
    creation_date: "2021-10-15T21:28:19.3058617Z",
    effective_start_date: "2021-10-15T21:28:18.4786844Z",
    commitment_end_date: "2024-10-14T00:00:00Z",
    cancellation_allowed_until_date: "2021-11-14T23:59:00Z",
    billing_cycle: "annual",
    billing_type: "license",
    term_duration: "P3Y",
    will_auto_renew: true,
    is_trial: false,
    is_nce: true,
    status: "active",
  },
];
const SubscriptionPage = () => {
  const [rows, setRows] = useState(defaultValues);
  const [searched, setSearched] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    {
      field: "offer_name",
      headerName: "Offer Name",
      width: 150,
      editable: true,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 150,
      editable: true,
    },
    {
      field: "commitment_end_date",
      headerName: "Renew On",
      width: 110,
      editable: true,
    },
    {
      field: "term_duration",
      headerName: "Terms",
      width: 110,
      editable: true,
    },
    {
      field: "will_auto_renew",
      headerName: "Auto Renewal",
      width: 110,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      sortable: false,
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <Link
          to={{ pathname: `detail/${params.row.id}` }}
          state={{
            ...params.row,
          }}
        >
          View Details
        </Link>
      ),
    },
  ];

  // useEffect(() => {
  //   axios
  //     .get("https://api.msolcsptest.com/portal/v1/subscriptions")
  //     .then(function (response) {
  //       if (response.data) {
  //         setRows(response.data);
  //       }
  //     });
  // }, []);

  const requestSearch = (searchedVal: string) => {
    const filteredRows = rows.filter((row: any) => {
      return row.offer_name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const onChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSearched(event.target.value as string);
    requestSearch(event.target.value as string);
  };
  const downloadColumns = [
    "ID",
    "Offer Name",
    "Quantity",
    "Renews On",
    "Terms",
    "Auto Renewel",
    "Status",
    "Type",
    "Description",
    "List",
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
          columns={downloadColumns}
          filename="subscription.csv"
        />
      </Box>
      <Box>
        <SearchBar value={searched} onChange={onChange} />
        <Box>
          <DataGrid
            rows={rows}
            columns={columns}
            disableSelectionOnClick={true}
            autoHeight={true}
            autoPageSize={true}
            hideFooter={true}
            pageSize={5}
          />
        </Box>
      </Box>
    </div>
  );
};

export default SubscriptionPage;
