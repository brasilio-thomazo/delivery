import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clients } from "../store/actions";

type Props = React.PropsWithChildren<{}>;

export const Clients: React.FC<Props> = () => {
  const { all } = useSelector((state: AppState) => state.client);
  const dispatch = useDispatch();
  return (
    <div className="table">
      <table className="items">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Número</th>
            <th>Complemento</th>
            <th className="actions"></th>
          </tr>
        </thead>
        <tbody>
          {all.map((data, i) => (
            <tr key={data.phone}>
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.phone}</td>
              <td>{data.address}</td>
              <td>{data.addr_number}</td>
              <td>{data.addr_complement}</td>
              <td className="buttons">
                <button
                  type="button"
                  className="far fa-edit"
                  onClick={() => dispatch(clients.set(i))}
                ></button>
                <button type="button" className="far fa-trash-alt"></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
