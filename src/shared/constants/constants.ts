/** @format */

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TuneIcon from "@mui/icons-material/Tune";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import { Modules } from "../../submodule/constants/constants";

export const SideBarRoutesList = [
  {
    text: "Subscriptions",
    icon: CheckCircleOutlineIcon,
    to: "/subscription", // <-- add link targets
    activeSideBar: Modules.Subscription,
  },
  {
    text: "Catalog",
    icon: ContentCopyIcon,
    to: "/catalog",
    activeSideBar: Modules.Catalog,
  },
  {
    text: "Orders",
    icon: TuneIcon,
    to: "/order",
    activeSideBar: Modules.Order,
  },
  {
    text: "Support",
    icon: HeadsetMicIcon,
    to: "/support",
    activeSideBar: Modules.Support,
  },
];

export const defaultSubscriptionValues: any = [
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

export const defaultOrderValues: any = [
  {
    id: "9qg-ErcO-4MPbPqq_3MIQaS7bn8W6HfG1",
    organization_id: "b0d70a69-4c42-4b27-b17b-91a835d8686a",
    creation_date: "2018-03-15T02:17:15.6455674Z",
    line_items: [
      {
        id: "1923-2395-23950-923052395059",
        offer_id: "DZH318Z0BQ4B:000Z:DZH318Z0DSPL",
        position: 0,
        offer_name: "Reserved_VM_Instance_Standard_D1_AP_East_1_Year",
        quantity: 1,
        subtotal_price: 2400,
        billing_cycle: "annual",
        billing_type: "license",
        term_duration: "P3Y",
        offer_sku: "1",
      },
    ],
    currency_code: "USD",
    billing_cycle: "annual",
    monthly_price: 1000,
    total_price: 12000,
    status: "pending",
  },
];

export const defaultOfferValues: any = [
  {
    id: 1,
    name: "Microsoft 365 E3",
    description:
      "Microsoft 365 E3 combines best-in-class productivity apps with core security and compliance capabilities.",
    msrp_price: 100,
    discount_price: 90,
    billing_term_options: "p1m, p1ym, p1ya",
    has_auto_renew: true,
    is_nce: true,
    status: "active",
  },
];
