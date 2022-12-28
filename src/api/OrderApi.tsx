/** @format */

import React from "react";
import axios from "axios";
import { defaultOrderValues } from "../shared/constants/constants";

export const OrderGetApi = () => {
  axios
    .get(`${process.env.REACT_APP_CLIENT_API_BASE}/orders`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return defaultOrderValues;
    });
};
