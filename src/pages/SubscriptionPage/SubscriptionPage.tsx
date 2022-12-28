/** @format */

import React, { useState, useEffect } from "react";
import Table from "../../submodule/components/Tables/Table";
import {
  MOBILE_COLUMNS_SUBSCRIPTION,
  TABLET_COLUMNS_SUBSCRIPTION,
  DESKTOP_COLUMNS_SUBSCRIPTION,
  DOWNLOAD_COLUMNS_SUBSCRIPTION,
  SUBSCRIPTION_COLUMNS,
} from "../../components/TableColumns/ColumnResponsive";
import "./Subscription.scss";
import { SubscriptionGetApi } from "../../api/SubscriptionApi";
import { defaultSubscriptionValues } from "../../shared/constants/constants";

const SubscriptionPage = () => {
  const [rows, setRows] = useState(defaultSubscriptionValues);

  useEffect(() => {
    setRows(SubscriptionGetApi());
  }, []);

  return (
    <Table
      getRows={rows}
      getColumns={SUBSCRIPTION_COLUMNS}
      getDesktopColumns={DESKTOP_COLUMNS_SUBSCRIPTION}
      getTabletColumns={TABLET_COLUMNS_SUBSCRIPTION}
      getMobileColumns={MOBILE_COLUMNS_SUBSCRIPTION}
      getDownloadColumns={DOWNLOAD_COLUMNS_SUBSCRIPTION}
      getDownloadFileName="Subscription.tsx"
      checkboxEnable={false}
    />
  );
};

export default SubscriptionPage;
