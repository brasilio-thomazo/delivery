import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BrowserRouter } from "react-router-dom";
import { Routes } from "../route";
import { api } from "../services";

import * as actions from "../store/actions";

export const App = () => {
  const dispatch = useDispatch();
  const { authenticate } = useSelector((state: AppState) => state);

  const loadState = useCallback(async () => {
    const resClient = api.get<Client[]>("/api/clients");
    const resPayment = api.get<Payment[]>("/api/payments");
    const resProduct = api.get<Product[]>("/api/products");
    const resPdtType = api.get<PdtType[]>("/api/product/types");
    const resPdtCategory = api.get<PdtCategory[]>("/api/product/categories");

    const clients = (await resClient).data;
    const payments = (await resPayment).data;
    const products = (await resProduct).data;
    const productTypes = (await resPdtType).data;
    const productCategories = (await resPdtCategory).data;

    dispatch(
      actions.setStore(
        clients,
        products,
        payments,
        productTypes,
        productCategories
      )
    );
  }, [dispatch]);

  useEffect(() => {
    if (authenticate) loadState();
  }, [authenticate, loadState]);

  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};
