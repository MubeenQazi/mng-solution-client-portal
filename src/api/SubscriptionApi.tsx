/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import { defaultSubscriptionValues } from "../shared/constants/constants";

export const SubscriptionGetApi = () => {
  axios
    .get(`${process.env.REACT_APP_CLIENT_API_BASE}/subscriptions`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return defaultSubscriptionValues;
    });
};

export const SubscriptionPostApi = (id: string, value: any) => {
  axios
    .post(`${process.env.REACT_APP_CLIENT_API_BASE}/subscriptions/${id}`, {
      id,
      value,
    })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });

  return false;
};
