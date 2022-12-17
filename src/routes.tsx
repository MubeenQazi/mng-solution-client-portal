import {
  Routes as Router, Route, BrowserRouter,
} from "react-router-dom";
import NotfoundPage from "./pages/NotFoundPage/NotfoundPage";
import Layout from "./components/Layout/Layout";
import SubscriptionPage from "./pages/SubscriptionPage/SubscriptionPage";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import SupportPage from "./pages/SupportPage/SupportPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import OrderDetailPage from "./pages/OrderDetailPage/OrderDetailPage";
import SubscriptionDetailPage from "./pages/SubscriptionDetailPage/SubscriptionDetailPage";
import { Modules } from "./shared/enum/enum";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TuneIcon from "@mui/icons-material/Tune";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";

export const SideBarRoutes = [
  {
    text: "Subscriptions",
    icon: <CheckCircleOutlineIcon />,
    to: "/subscription", // <-- add link targets
    activeSideBar: Modules.Subscription
  },
  {
    text: "Catalog",
    icon: <ContentCopyIcon />,
    to: "/catalog",
    activeSideBar: Modules.Catalog
  },
  {
    text: "Orders",
    icon: <TuneIcon />,
    to: "/order",
    activeSideBar: Modules.Order
  },
  {
    text: "Support",
    icon: <HeadsetMicIcon />,
    to: "/support",
    activeSideBar: Modules.Support
  },
];

const Routes = () => {
  return (
    <BrowserRouter>
      <Router>
        <Route path='*' element={<NotfoundPage />} />
        <Route path="/" element={<Layout />}>
          <Route path="" element={<SubscriptionPage />} />
          <Route path="subscription" element={<SubscriptionPage />} />
          <Route path="subscription/detail/:id" element={<SubscriptionDetailPage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="order" element={<OrdersPage />} />
          <Route path="order/detail/:id" element={<OrderDetailPage />} />
        </Route>
      </Router>
    </BrowserRouter>
  );
};

export default Routes;