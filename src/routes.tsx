/** @format */

import { Routes as Router, Route, BrowserRouter } from "react-router-dom";
import NotfoundPage from "./submodule/pages/NotFoundPage/NotfoundPage";
import Start from "./submodule/pages/Start/Start";
import Layout from "./submodule/components/admin/Layout/Layout";
import SubscriptionPage from "./pages/SubscriptionPage/SubscriptionPage";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import SupportPage from "./pages/SupportPage/SupportPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import OrderDetailPage from "./pages/OrderDetailPage/OrderDetailPage";
import SubscriptionDetailPage from "./pages/SubscriptionDetailPage/SubscriptionDetailPage";
import LoginPage from "./pages/LoginPage/LoginPage";

const Routes = () => {
  return (
    <BrowserRouter>
      <Router>
        <Route path="*" element={<NotfoundPage />} />
        <Route path="/start" element={<Start app="portal" />} />
        <Route path="/login" element={<LoginPage userType="client" />} />

        <Route path="/" element={<Layout />}>
          <Route path="" element={<SubscriptionPage />} />
          <Route path="subscription" element={<SubscriptionPage />} />
          <Route
            path="subscription/detail/:id"
            element={<SubscriptionDetailPage />}
          />
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
