/** @format */

import React, { lazy, Suspense } from "react";

import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TuneIcon from "@mui/icons-material/Tune";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import { authState } from "../../features/auth/authSlice";
import { useAppSelector } from "../hooks";
import DashboardLayout from "../layout/DashboardLayout/DashboardLayout";
import AuthLayout from "../layout/AuthLayout/AuthLayout";
import { UserType, Modules } from "../enum";

const BecomeCustomer = lazy(() => import("../pages/Customer/BecomeCustomer"));
const Catalog = lazy(() => import("../pages/dashboard/Catalog/Catalog"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard/Dashboard"));
const Login = lazy(() => import("../pages/auth/Login/Login"));
const Notfound = lazy(() => import("../pages/NotFound/Notfound"));
const Orders = lazy(() => import("../pages/dashboard/Orders/Orders"));
const OrderDetail = lazy(() => import("../pages/dashboard/Orders/OrdersDetail"));
const Subscription = lazy(() => import("../pages/dashboard/Subscription/Subscription"));
const Support = lazy(() => import("../pages/dashboard/Support/Support"));
const SubscriptionDetail = lazy(() => import("../pages/dashboard/Subscription/SubscriptionDetail"));

export const SideBarRoutes = [
  {
    text: "Subscriptions",
    icon: <CheckCircleOutlineIcon />,
    to: "/dashboard/subscription", // <-- add link targets
    role: UserType.client,
    activeSideBar: Modules.Subscription
  },
  {
    text: "Catalog",
    icon: <ContentCopyIcon />,
    to: "/dashboard/catalog",
    role: UserType.client,
    activeSideBar: Modules.Catalog
  },
  {
    text: "Orders",
    icon: <TuneIcon />,
    to: "/dashboard/order", // <-- add link targets
    role: UserType.client,
    activeSideBar: Modules.Order
  },
  {
    text: "Support",
    icon: <HeadsetMicIcon />,
    to: "/dashboard/support",
    role: UserType.client,
    activeSideBar: Modules.Support
  },
];

const Routing = () => {
  const { isLoggedIn, user } = useAppSelector(authState);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/not-found" element={<Notfound />} />
      <Route path="/become-customer" element={<BecomeCustomer />} />

      {isLoggedIn ? (
        <Route path="/dashboard" element={<DashboardLayout />}>
              <Route
                path="*"
                element={<Navigate to={isLoggedIn ? "/not-found" : "/"} />}
              />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="subscription"
                element={
                  <Suspense fallback={null}>
                    <Subscription />
                  </Suspense>
                }
              />
              <Route
                path="subscription/detail/:id"
                element={
                  <Suspense fallback={null}>
                    <SubscriptionDetail />
                  </Suspense>
                }
              />
              <Route path="catalog" element={<Catalog />} />
              <Route path="order" element={<Orders />} />
              <Route
                path="order/detail/:id"
                element={
                  <Suspense fallback={null}>
                    <OrderDetail />
                  </Suspense>
                }
              />
              <Route path="support" element={<Support />} />
            
        </Route>
      ) : (
        <Route path="/" element={<AuthLayout />}>
          <Route path="/" element={<Login userType={ UserType.client } />} />
        </Route>
      )}
      <Route
        path="*"
        element={
          <Navigate
            to={
              isLoggedIn
                ? "/dashboard/subscription"
                : "/"
            }
          />
        }
      />
    </Routes>
  );
};

export default Routing;
