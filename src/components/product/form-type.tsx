import React, { ChangeEvent, SyntheticEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../services";
import * as actions from "../../store/actions";

const initReason = { message: "", errors: { name: "" } };
const initValues = { id: -1, name: "" };
type Props = React.PropsWithChildren<{}>;

export const FormType: React.FC<Props> = () => {
  const [values, setValues] = useState(initValues);
  const [reason, setReason] = useState(initReason);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setValues({ ...values, [id]: value });
  };
  const dispatch = useDispatch();
  const { type } = useSelector((state: AppState) => state.product.type);

  useEffect(() => {
    setValues({ ...type });
  }, [type]);

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setReason({ ...initReason, message: "Aguarde ..." });
    try {
      let uri, point, action;
      if (values.id > 0) {
        uri = `/api/product/types/${values.id}`;
        point = api.put;
        action = actions.product.type.update;
      } else {
        uri = `/api/product/types`;
        point = api.post;
        action = actions.product.type.insert;
      }
      const { data } = await point<PdtType>(uri, values);
      dispatch(action(data));
      setValues({ ...initValues });
      setReason({ ...initReason, message: "Registrado com sucesso!" });
    } catch (reason) {
      console.log(values);
      if (reason.response) setReason({ ...reason.response.data });
    }
  };

  return (
    <form className="form-layout" onSubmit={onSubmit}>
      <div className="line">
        <div className="col">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            className="field"
            id="name"
            value={values.name}
            onChange={handleChange}
          />
          <div className="field-text">
            (*) Nome do tipo do produto&nbsp;
            <span className="error">{reason.errors?.name}</span>
          </div>
        </div>
      </div>
      <div className="line-btn">
        <span className="field-text">{reason.message}</span>
        <button type="submit" className="btn">
          Salvar
        </button>
      </div>
    </form>
  );
};
