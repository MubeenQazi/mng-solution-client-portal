/** @format */

import React from "react";
import axios from "axios";

export const LoginApi = () => {
  axios
    .get(`${process.env.REACT_APP_API_BASE}/sso/v1/signin`, {
      params: { app: "portal" },
    })
    .then(function (response) {
      return true;
    })
    .catch(function (error) {
      return false;
    });

  return false;
};
