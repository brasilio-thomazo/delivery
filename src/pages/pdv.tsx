import React from "react";
import { FormPdv } from "../components/form-pdv";
import { Layout } from "../layout";
import { PdvProvider } from "../providers/pdv";
import { OrderPdv } from "../components/order-pdv";
import { TotalPdv } from "../components/total-pdv";
import { ButtonPdv } from "../components/button-pdv";

type Props = React.PropsWithChildren<{}>;

export const Pdv: React.FC<Props> = () => {
  return (
    <Layout>
      <PdvProvider>
        <div className="pdv">
          <FormPdv />
          <OrderPdv />
          <TotalPdv />
          <ButtonPdv />
        </div>
      </PdvProvider>
    </Layout>
  );
};

/*
import React, { createRef, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
// components
import NumberFormat from "react-number-format";
import { Layout } from "../layout";
import AutoSuggestion from "../components/autosuggestion";

// actions
import * as actions from "../store/actions/pdv";

export function PDV() {
  const clientRef = useRef(null);
  const pdv = useSelector((state) => state.pdv);
  const dispatch = useDispatch();
  const productRef = pdv.parts.map(() => createRef());

  useEffect(() => {
    dispatch(actions.setPayment(payments[0], 0));
  }, [dispatch]);

  function mkref(ref, i) {
    if (productRef.length === i) productRef.push(ref);
    if (ref) productRef[i].current = ref;
  }

  function mkpart() {
    productRef.push(createRef());
    dispatch(actions.mkpart);
  }

  function rmpart() {
    if (pdv.parts.length > 1) {
      productRef.pop();
      dispatch(actions.rmpart);
    }
  }

  function addItem() {
    dispatch(actions.addItem);
    productRef.forEach((ref) => ref.current.clear());
  }

  function setPayment({ target }) {
    const index = target.value;
    dispatch(actions.setPayment(payments[index], index));
  }

  return (
    <Layout>
      <div className="pdv">
        <div className="client-label">
          <label htmlFor="client">Cliente</label>
          <button type="button" className="btn-icon">
            <span className="fas fa-user-plus"></span>
          </button>
        </div>
        <div className="client-field">
          <AutoSuggestion
            id="client"
            ref={clientRef}
            options={clients}
            keys={["name", "phone"]}
            onSelected={(data) => dispatch(actions.setClient(data))}
          />
          {pdv.client && (
            <span className="field-text">
              {[
                pdv.client.address,
                pdv.client.addr_number,
                pdv.client.addr_complement,
              ]
                .filter((str) => str && str.length > 0)
                .join(", ")}
            </span>
          )}
        </div>
        <div className="product-label">
          <label htmlFor="product">Produto</label>
          <button type="button" onClick={mkpart} className="btn-icon">
            <span className="fas fa-plus-circle"></span>
          </button>
          <button type="button" onClick={rmpart} className="btn-icon">
            <span className="fas fa-minus-circle"></span>
          </button>
          <button type="button" onClick={addItem} className="btn-icon">
            <span className="fas fa-cart-plus"></span>
          </button>
        </div>
        <div className="product-field">
          {pdv.parts.map((part, i) => (
            <AutoSuggestion
              ref={(ref) => mkref(ref, i)}
              key={i}
              options={products}
              keys={["type.name", "name"]}
              onSelected={(data) => dispatch(actions.setPart(data, i))}
            />
          ))}
        </div>
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
              {pdv.items.map((item, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.type}</td>
                  <td>{item.names.join("/")}</td>
                  <td>{currency(item.price)}</td>
                  <td className="actions">
                    <button
                      type="button"
                      onClick={() => dispatch(actions.removeItem(i))}
                      className=""
                    >
                      <span className="far fa-trash-alt"></span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="total">
          <div className="line">
            <div className="label">Total:</div>
            <div className="price">{currency(pdv.order.price)}</div>
          </div>
          <div className="line">
            <label htmlFor="payment">Forma de pagamento:</label>
            <div className="price">
              <select
                name="payment"
                id="payment"
                onChange={setPayment}
                className="field"
                value={pdv.payment.index}
              >
                {payments.map((payment, i) => (
                  <option key={i} value={i}>
                    {payment.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {pdv.payment.repay && (
            <div className="line">
              <div className="label">Valor pago:</div>
              <div className="price">
                <NumberFormat
                  className="field"
                  value={pdv.order.pay}
                  id="pay"
                  name="pay"
                  decimalScale={2}
                  decimalSeparator=","
                  prefix="R$ "
                  fixedDecimalScale={true}
                  allowNegative={false}
                  onValueChange={(num) =>
                    dispatch(actions.setPay(num.floatValue))
                  }
                />
              </div>
            </div>
          )}
          <div className="line">
            <div className="label">Troco:</div>
            <div className="price">{currency(pdv.order.repay)}</div>
          </div>
        </div>
        <div className="button">
          {pdv.order.id_client &&
            pdv.order.items.length > 0 &&
            pdv.order.pay >= pdv.order.price && (
              <button
                type="button"
                className="btn"
                onClick={() => dispatch(actions.finish)}
              >
                <span className="fas fa-shopping-bag left"></span>
                Fechar pedido
              </button>
            )}
        </div>
      </div>
    </Layout>
  );
}
export default PDV;
*/
