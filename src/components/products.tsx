import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { numberFormat } from "../services";
import { product } from "../store/actions";

type Props = React.PropsWithChildren<{}>;

export const Products: React.FC<Props> = () => {
  const { all } = useSelector((state: AppState) => state.product);
  const dispatch = useDispatch();

  return (
    <div className="table">
      <table className="items">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Categoria</th>
            <th>Descri&ccedil;&atilde;o do</th>
            <th>Custo</th>
            <th>Venda</th>
            <th className="actions"></th>
          </tr>
        </thead>
        <tbody>
          {all.map((data, i) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.type.name}</td>
              <td>{data.category.name}</td>
              <td>{data.description}</td>
              <td>{numberFormat(data.cost)}</td>
              <td>{numberFormat(data.price)}</td>
              <td className="buttons">
                <button
                  type="button"
                  className="far fa-edit"
                  onClick={() => dispatch(product.set(i))}
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
