/** @format */

import React, { useState, useEffect } from "react";
import Table from "../../submodule/components/Tables/Table";
import {
  MOBILE_COLUMNS_ORDER,
  TABLET_COLUMNS_ORDER,
  DESKTOP_COLUMNS_ORDER,
  DOWNLOAD_COLUMNS_ORDER,
  ORDER_COLUMNS,
} from "../../components/TableColumns/ColumnResponsive";
import "./Orders.scss";

import { OrderGetApi } from "../../api/OrderApi";
import { defaultOrderValues } from "../../shared/constants/constants";

const OrdersPage = () => {
  const [rows, setRows] = useState(defaultOrderValues);

  useEffect(() => {
    setRows(OrderGetApi());
  }, []);

  return (
    <Table
      getRows={rows}
      getColumns={ORDER_COLUMNS}
      getDesktopColumns={DESKTOP_COLUMNS_ORDER}
      getTabletColumns={TABLET_COLUMNS_ORDER}
      getMobileColumns={MOBILE_COLUMNS_ORDER}
      getDownloadColumns={DOWNLOAD_COLUMNS_ORDER}
      getDownloadFileName="Order.tsx"
      checkboxEnable={false}
    />
  );
};

export default OrdersPage;
