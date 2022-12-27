/** @format */

export const MOBILE_COLUMNS_SUBSCRIPTION = {
  offer_name: true,
  quantity: false,
  commitment_end_date: false,
  term_duration: true,
  will_auto_renew: false,
  status: false,
};

export const TABLET_COLUMNS_SUBSCRIPTION = {
  offer_name: true,
  quantity: false,
  commitment_end_date: false,
  term_duration: true,
  will_auto_renew: false,
  status: true,
};

export const ALL_COLUMNS_SUBSCRIPTION = {
  offer_name: true,
  quantity: true,
  commitment_end_date: true,
  term_duration: true,
  will_auto_renew: true,
  status: true,
};

export const SubscriptionColumns = [
  {
    field: "offer_name",
    headerName: "Offer Name",
    headerClassName: "super-app-theme--header",
    flex: 1,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    headerClassName: "super-app-theme--header",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "commitment_end_date",
    headerClassName: "super-app-theme--header",
    headerName: "Renew On",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "term_duration",
    headerClassName: "super-app-theme--header",
    headerName: "Terms",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "will_auto_renew",
    headerName: "Auto Renewal",
    headerClassName: "super-app-theme--header",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "status",
    headerName: "Status",
    headerClassName: "super-app-theme--header",
    sortable: false,
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
];

export const SubscriptionDownloadColumns = [
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
