import React, { useContext, useState } from "react";
import { pdvContext } from "../providers/pdv";
import { api } from "../services";

interface Props {}
export const ButtonPdv: React.FC<React.PropsWithChildren<Props>> = () => {
  const [printer, setPrinter] = useState({
    id: -1,
    id_order: -1,
    printable: false,
  });
  const {
    order: {
      client,
      items,
      pay,
      price,
      cost,
      user,
      payment,
      repay,
      observation,
    },
    closeOrder,
  } = useContext(pdvContext);

  const saveOrder = async () => {
    const formData = {
      id_user: user.id,
      id_client: client.id,
      id_payment: payment.id,
      price,
      cost,
      pay,
      repay,
      observation,
      items: items.map(
        (item) =>
          ({
            cost: item.cost,
            price: item.price,
            parts: item.parts.map(
              (part) =>
                ({
                  id_product: part.id,
                  cost: part.cost,
                  price: part.price,
                } as OrderItemPart)
            ),
          } as OrderItem)
      ),
    };

    const response = await api.post<Printer>("/api/orders", formData);
    setPrinter(response.data);
  };

  const save = async () => {
    await saveOrder();
    closeOrder();
  };

  const print = async () => {
    if (printer.id < 0) return await saveOrder();
    const formData = { printable: true };
    await api.put<Printer>(`/api/printers/${printer.id}`, formData);
  };

  return (
    <div className="button">
      {client?.id && items?.length > 0 && pay >= price && (
        <>
          <button type="button" className="btn" onClick={print}>
            <span className="fas fa-print left"></span>
            Imprimir
          </button>
          &nbsp;
          <button type="button" className="btn" onClick={save}>
            <span className="fas fa-shopping-bag left"></span>
            Fechar e Imprimir
          </button>
        </>
      )}
    </div>
  );
};
