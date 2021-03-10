import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../services";
import * as actions from "../store/actions";
import { FormType } from "./product/form-type";
import { FormCategory } from "./product/form-category";
import { PdtTypes } from "./product/types";
import { PdtCategories } from "./product/categories";

const initReason = {
  message: "",
  errors: {
    name: "",
    id_type: "",
    id_category: "",
    description: "",
    cost: "",
    price: "",
  },
};

const initValues = {
  id: -1,
  name: "",
  id_type: 1,
  id_category: 1,
  description: "",
  cost: 0 as number,
  price: 0,
};

type Props = React.PropsWithChildren<{}>;
export const FormProduct: React.FC<Props> = () => {
  const [values, setValues] = useState(initValues);
  const [reason, setReason] = useState(initReason);
  const { product } = useSelector((state: AppState) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setValues({ ...product.product });
  }, [product.product]);

  const onValueChange = (n: NumberFormatValues, id: string) => {
    if (n.floatValue) setValues({ ...values, [id]: n.floatValue });
  };

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setValues({ ...values, [id]: value });
  };

  const createType = () => {
    dispatch(
      actions.showSidebar("Registrar um novo tipo", [
        <FormType key={0} />,
        <PdtTypes key={1} />,
      ])
    );
  };

  const createCategory = () => {
    dispatch(
      actions.showSidebar("Registrar uma nova categoria", [
        <FormCategory key={0} />,
        <PdtCategories key={1} />,
      ])
    );
  };

  const onReset = () => {
    setValues({ ...initValues });
  };

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setReason({ ...initReason, message: "Aguarde ..." });
    try {
      let uri, point, action;
      if (values.id > 0) {
        uri = `/api/products/${values.id}`;
        point = api.put;
        action = actions.product.update;
      } else {
        uri = `/api/products`;
        point = api.post;
        action = actions.product.insert;
      }
      const { data } = await point<Product>(uri, values);
      dispatch(action(data));
      setValues({ ...initValues });
      setReason({ ...initReason, message: "Registrado com sucesso!" });
    } catch (reason) {
      if (reason.response) {
        setReason({ ...reason.response.data });
      }
    }
  };

  return (
    <form className="form-layout" onSubmit={onSubmit} onReset={onReset}>
      <div className="line">
        <div className="col">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            className="field"
            id="name"
            value={values.name}
            onChange={onChange}
          />
          <div className="field-text">
            (*) Nome do produto{" "}
            <span className="error">{reason.errors?.name}</span>
          </div>
        </div>
      </div>
      <div className="line">
        <div className="col">
          <div className="field-group">
            <label htmlFor="id_type">Tipo:</label>
            <button type="button" className="btn-icon" onClick={createType}>
              <span className="fas fa-plus-circle"></span>
            </button>
          </div>
          <select
            className="field"
            id="id_type"
            value={values.id_type}
            onChange={onChange}
          >
            {product.type.all.map((data) => (
              <option key={data.id} value={data.id}>
                {data.name}
              </option>
            ))}
          </select>
          <div className="field-text">
            (*) Tipo do produto{" "}
            <span className="error">{reason.errors?.id_type}</span>
          </div>
        </div>
        <div className="col">
          <div className="field-group">
            <label htmlFor="id_category">Categoria:</label>
            <button type="button" className="btn-icon" onClick={createCategory}>
              <span className="fas fa-plus-circle"></span>
            </button>
          </div>
          <select
            className="field"
            id="id_category"
            value={values.id_category}
            onChange={onChange}
          >
            {product.category.all.map((data) => (
              <option key={data.id} value={data.id}>
                {data.name}
              </option>
            ))}
          </select>
          <div className="field-text">
            (*) Categoria do produto{" "}
            <span className="error">{reason.errors?.id_category}</span>
          </div>
        </div>
      </div>
      <div className="line">
        <div className="col">
          <label htmlFor="description">Descrição</label>
          <textarea
            className="text-area"
            id="description"
            rows={3}
            value={values.description}
            onChange={onChange}
          />
          <div className="field-text">
            (*) Descrição do produto{" "}
            <span className="error">{reason.errors?.description}</span>
          </div>
        </div>
      </div>
      <div className="line">
        <div className="col">
          <label htmlFor="cost">Custo:</label>
          <NumberFormat
            className="field"
            value={values.cost}
            id="cost"
            name="cost"
            decimalScale={2}
            decimalSeparator=","
            prefix="R$ "
            fixedDecimalScale={true}
            allowNegative={false}
            onValueChange={(n) => onValueChange(n, "cost")}
          />
          <div className="field-text">
            (*) Valor de custo do produto{" "}
            <span className="error">{reason.errors?.cost}</span>
          </div>
        </div>
        <div className="col">
          <label htmlFor="price">Venda:</label>
          <NumberFormat
            className="field"
            value={values.price}
            id="price"
            name="price"
            decimalScale={2}
            decimalSeparator=","
            prefix="R$ "
            fixedDecimalScale={true}
            allowNegative={false}
            onValueChange={(n) => onValueChange(n, "price")}
          />
          <div className="field-text">
            (*) Valor de venda do produto{" "}
            <span className="error">{reason.errors?.price}</span>
          </div>
        </div>
      </div>
      <div className="line-btn">
        <span className="field-text">{reason.message}</span>
        <div className="buttons">
          {values.id > 0 && (
            <button type="reset" className="btn">
              Novo
            </button>
          )}
          <button type="submit" className="btn">
            Salvar
          </button>
        </div>
      </div>
    </form>
  );
};
