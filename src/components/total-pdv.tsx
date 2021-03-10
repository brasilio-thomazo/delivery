import React, { useContext } from "react";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { pdvContext } from "../providers/pdv";
import { numberFormat } from "../services";

interface Props {}

export const TotalPdv: React.FC<React.PropsWithChildren<Props>> = () => {
  const { all } = useSelector((state: AppState) => state.payment);
  const {
    order: { price, pay, payment, repay, observation },
    setPayment,
    setPay,
    setObservation,
  } = useContext(pdvContext);

  return (
    <>
      <div className="observation">
        <label htmlFor="observation">Observações:</label>
        <textarea
          name="observation"
          id="observation"
          rows={3}
          placeholder="Ex: Calabresa sem cebola."
          className="text-area"
          value={observation}
          onChange={setObservation}
        ></textarea>
      </div>
      <div className="total">
        <div className="line">
          <div className="label">Total:</div>
          <div className="price">{numberFormat(price)}</div>
        </div>
        <div className="line">
          <label htmlFor="payment">Forma de pagamento:</label>
          <div className="price">
            <select
              name="payment"
              id="payment"
              onChange={setPayment}
              className="field"
              value={payment?.name}
            >
              {all.map((payment, i) => (
                <option key={i}>{payment.name}</option>
              ))}
            </select>
          </div>
        </div>
        {payment?.repay && (
          <div className="line">
            <div className="label">Valor pago:</div>
            <div className="price">
              <NumberFormat
                className="field"
                value={pay}
                id="pay"
                name="pay"
                decimalScale={2}
                decimalSeparator=","
                prefix="R$ "
                fixedDecimalScale={true}
                allowNegative={false}
                onValueChange={(num) => setPay(num.floatValue)}
              />
            </div>
          </div>
        )}
        <div className="line">
          <div className="label">Troco:</div>
          <div className="price">{numberFormat(repay)}</div>
        </div>
      </div>
    </>
  );
};
