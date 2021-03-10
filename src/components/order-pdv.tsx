import React, { useContext } from "react";
import { pdvContext } from "../providers/pdv";
import { numberFormat } from "../services";

interface Props {}

export const OrderPdv: React.FC<React.PropsWithChildren<Props>> = () => {
  const { items } = useContext<OrderViewState>(pdvContext).order;
  return (
    <div className="order">
      <table className="items">
        <thead>
          <tr>
            <th>#</th>
            <th>Tipo</th>
            <th>Nome</th>
            <th>Valor</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{item.parts[0].type.name}</td>
              <td>{item.parts.map((v) => v.name).join("/")}</td>
              <td>{numberFormat(item.price)}</td>
              <td className="actions">
                <button type="button" onClick={() => console.log("CLICK")}>
                  <span className="far fa-trash-alt"></span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
