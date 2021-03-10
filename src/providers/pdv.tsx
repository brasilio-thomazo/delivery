import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const initStore = {
  order: {
    user: {} as User,
    client: { name: "" } as Client,
    payment: {} as Payment,
    price: 0,
    cost: 0,
    pay: 0,
    repay: 0,
    observation: "",
    items: [] as OrderViewItem[],
  },
  insertItem: (products: Product[]) => {},
  setClient: (client: Client) => {},
  setPayment: (e: React.ChangeEvent<HTMLSelectElement>) => {},
  setPay: (pay: number | undefined) => {},
  setObservation: (e: React.ChangeEvent<HTMLTextAreaElement>) => {},
  closeOrder: () => {},
};

export const pdvContext = React.createContext<OrderViewState>(initStore);
export const PdvProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const { user, payment } = useSelector((state: AppState) => state);
  const [order, setOrder] = useState(initStore.order);

  const setInitialState = () => {
    setOrder((o) => {
      return { ...o, user: user, payment: payment.all[0] };
    });
  };

  useEffect(setInitialState, [payment, user]);

  const insertItem = (products: Product[]) => {
    const item = { price: 0, cost: 0, parts: [] } as OrderViewItem;
    const parts = products.filter((product) => product.id > 0);
    parts.forEach((part) => {
      item.price = item.price < part.price ? part.price : item.price;
      item.cost += part.cost / parts.length;
      item.parts.push(part);
    });
    const data = order;
    data.price += item.price;
    data.cost += item.cost;
    data.pay = data.pay < data.price ? data.price : data.pay;
    data.repay = data.pay - data.price;
    data.items.push(item);
    setOrder({ ...data });
  };

  const setClient = (client: Client) => {
    setOrder({ ...order, client });
  };

  const setPayment = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    payment.all.forEach((v) => {
      if (v.name === value) return setOrder({ ...order, payment: v });
    });
  };

  const setPay = (pay: number | undefined) => {
    if (pay) setOrder({ ...order, pay, repay: pay - order.price });
  };

  const setObservation = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setOrder({ ...order, observation: value });
  };

  const closeOrder = () => {
    setOrder({
      ...initStore.order,
      items: [],
      user: order.user,
      payment: order.payment,
    });
  };

  return (
    <pdvContext.Provider
      value={{
        order,
        insertItem,
        setPayment,
        setPay,
        setClient,
        setObservation,
        closeOrder,
      }}
    >
      {children}
    </pdvContext.Provider>
  );
};
