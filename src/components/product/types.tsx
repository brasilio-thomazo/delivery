import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { product } from "../../store/actions";

type Props = React.PropsWithChildren<{}>;

export const PdtTypes: React.FC<Props> = () => {
  const { all } = useSelector((state: AppState) => state.product.type);
  const dispatch = useDispatch();
  return (
    <div className="table">
      <table className="items">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th className="actions">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {all.map((data, i) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td className="buttons">
                <button
                  type="button"
                  className="far fa-edit"
                  onClick={() => dispatch(product.type.set(i))}
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
