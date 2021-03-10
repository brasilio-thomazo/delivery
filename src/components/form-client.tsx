import React, {
  useState,
  useRef,
  Dispatch,
  ChangeEvent,
  useEffect,
} from "react";
import InputMask from "react-input-mask";
import { Places } from "./places";
import { api } from "../services";

import * as actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";

const initReason = {
  message: "",
  errors: {
    name: "",
    phone: "",
    address: "",
    addr_number: "",
  },
};

const initValues = {
  id: -1,
  name: "",
  phone: "",
  address: "",
  addr_number: 0,
  addr_complement: "",
};

type Props = React.PropsWithChildren<{}>;
export const Form: React.FC<Props> = () => {
  const [values, setValues] = useState(initValues);
  const [reason, setReason] = useState(initReason);
  const dispatch: Dispatch<AppAction> = useDispatch();
  const placeRef = useRef<PlacesRef>(null);
  const { client } = useSelector((state: AppState) => state);

  useEffect(() => {
    setValues({ ...client.client });
  }, [client.client]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    let { id, value } = e.target;
    if (id === "phone") value = value.replace(/[^\d]/g, "");
    setValues({ ...values, [id]: value });
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setReason({ ...initReason, message: "Aguarde ..." });
    try {
      let uri, point, action;
      if (values.id > 0) {
        uri = `/api/clients/${values.id}`;
        point = api.put;
        action = actions.clients.update;
      } else {
        uri = `/api/clients`;
        point = api.post;
        action = actions.clients.insert;
      }
      const { data } = await point<Client>(uri, values);
      dispatch(action(data));
      setValues({ ...initValues });
      setReason({ ...initReason, message: "Registrado com sucesso!" });
    } catch (reason) {
      if (reason.response) {
        setReason({ ...reason.response.data });
      }
    }
  };

  const onSelected = (data: string) => {
    setValues({ ...values, address: data });
  };

  const onReset = () => {
    setValues({ ...initValues });
  };

  return (
    <form className="form-clients" onSubmit={onSubmit} onReset={onReset}>
      <div className="line">
        <div className="col">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            className="field"
            onChange={onChange}
            value={values.name}
          />
          <div className="field-text">
            (*) Nome do clientes{" "}
            <span className="error">{reason.errors?.name}</span>
          </div>
        </div>
        <div className="col">
          <label htmlFor="phone">Telefone:</label>
          <InputMask
            type="text"
            className="field"
            id="phone"
            mask={
              values.phone.length > 10 ? "(99) 99999-9999" : "(99) 9999-99999"
            }
            value={values.phone}
            onChange={onChange}
          />
          <div className="field-text">
            (*) Telefone
            <span className="error">{reason.errors?.phone}</span>
          </div>
        </div>
      </div>
      <div className="line">
        <div className="col">
          <label htmlFor="address">Endere&ccedil;o:</label>
          <Places
            ref={placeRef}
            onSelected={onSelected}
            value={values.address}
          />
          <div className="field-text">
            (*) Endere&ccedil;o
            <span className="error">{reason.errors?.address}</span>
          </div>
        </div>
        <div className="col flex-teste">
          <label htmlFor="addr_number">N&uacute;mero:</label>
          <input
            type="number"
            id="addr_number"
            className="field"
            min="1"
            onChange={onChange}
            value={values.addr_number}
          />
          <div className="field-text">
            (*) N&uacute;mero da casa
            <span className="error">{reason.errors?.addr_number}</span>
          </div>
        </div>
      </div>
      <div className="line">
        <div className="col">
          <label htmlFor="addr_complement">Complemento:</label>
          <input
            type="text"
            id="addr_complement"
            className="field"
            onChange={onChange}
            value={values.addr_complement}
          />
          <div className="field-text">
            Complemento do endere&ccedil;o (Apt, Bloco, etc)
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
