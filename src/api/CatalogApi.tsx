/** @format */

import React from "react";
import axios from "axios";
import { defaultOfferValues } from "../shared/constants/constants";

export const OfferGetApi = () => {
  axios
    .get(`${process.env.REACT_APP_CLIENT_API_BASE}/offers`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return defaultOfferValues;
    });
};

export const OrderPostApi = (
  id: string,
  quantity: number,
  billingCycle: string,
  termDuration: string,
  sku: string
) => {
  axios
    .post(`${process.env.REACT_APP_CLIENT_API_BASE}/order`, {
      id,
      quantity,
      billingCycle,
      termDuration,
      sku,
    })
    .then(function (response) {
      return true;
    })
    .catch(function (error) {
      return false;
    });
};
