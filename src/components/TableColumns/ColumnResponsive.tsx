/** @format */

/*********************************************
 * SUBSCRIPTION COLUMNS START
 ********************************************/

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

export const DESKTOP_COLUMNS_SUBSCRIPTION = {
  offer_name: true,
  quantity: true,
  commitment_end_date: true,
  term_duration: true,
  will_auto_renew: true,
  status: true,
};

export const DOWNLOAD_COLUMNS_SUBSCRIPTION = [
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

export const SUBSCRIPTION_COLUMNS = [
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

/*********************************************
 * SUBSCRIPTION COLUMNS END
 ********************************************/

/*********************************************
 * ORDER COLUMNS START
 ********************************************/

export const MOBILE_COLUMNS_ORDER = {
  creation_date: true,
  currency_code: false,
  billing_cycle: true,
  monthly_price: false,
  total_price: false,
  status: false,
};

export const TABLET_COLUMNS_ORDER = {
  creation_date: true,
  currency_code: false,
  billing_cycle: true,
  monthly_price: false,
  total_price: true,
  status: true,
};

export const DESKTOP_COLUMNS_ORDER = {
  creation_date: true,
  currency_code: true,
  billing_cycle: true,
  monthly_price: true,
  total_price: true,
  status: true,
};

export const DOWNLOAD_COLUMNS_ORDER = [
  "ID",
  "Organization Id",
  "Date",
  "Line Items",
  "Currency",
  "Billing Cycle",
  "Monthly Price",
  "Total Price",
  "Status",
];

export const ORDER_COLUMNS = [
  {
    field: "creation_date",
    headerName: "Date",
    headerClassName: "super-app-theme--header",
    flex: 1,
  },
  {
    field: "currency_code",
    headerName: "Currency",
    headerClassName: "super-app-theme--header",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "billing_cycle",
    headerName: "Billing",
    headerClassName: "super-app-theme--header",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "monthly_price",
    headerClassName: "super-app-theme--header",
    headerName: "Monthly Price",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "total_price",
    headerName: "Total price",
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

/*********************************************
 * ORDERS COLUMNS END
 ********************************************/

/** @format */
