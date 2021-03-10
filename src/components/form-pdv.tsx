import React, { useContext, useRef, useState } from "react";
import { pdvContext } from "../providers/pdv";
import { SuggestionsClient } from "./suggestions-client";
import { SuggestionsProduct } from "./suggestions-product";

type Props = React.PropsWithChildren<{}>;
export const FormPdv: React.FC<Props> = () => {
  //const [client, setClient] = useState({} as Client);
  const [parts, setParts] = useState([{} as Product]);
  const {
    insertItem,
    setClient,
    order: { client },
  } = useContext(pdvContext);
  const refs = [
    useRef<SuggestionRef>(null),
  ] as React.MutableRefObject<SuggestionRef>[];

  function mkref(ref: any, i: number) {
    if (refs.length === i) refs.push(ref);
    else if (ref) refs[i].current = ref;
  }

  const productSelected = (data: Product, index: number) => {
    const current = parts;
    current[index] = data;
    setParts(current);
  };

  const mkpart = () => {
    setParts([...parts, {} as Product]);
  };

  const rmpart = () => {
    if (parts.length === 1) return;
    setParts(parts.filter((p, k) => k < parts.length - 1));
  };

  const addItem = () => {
    insertItem(parts);
    parts.forEach((v, k) => {
      refs[k].current?.clear();
    });
    setParts(parts.map(() => ({} as Product)));
  };

  return (
    <React.Fragment>
      <div className="client-label">
        <label htmlFor="client">Cliente</label>
        <button type="button" className="btn-icon">
          <span className="fas fa-user-plus"></span>
        </button>
      </div>
      <div className="client-field">
        <SuggestionsClient
          onSelected={setClient}
          value={[client.name, client.phone].join(" ").trim()}
        />
        {client?.address && (
          <span className="field-text">
            {[
              client.address,
              client.addr_number.toString(),
              client.addr_complement,
            ]
              .filter((value) => value && value.length > 0)
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
        {parts.map((p, k) => (
          <SuggestionsProduct
            key={k}
            ref={(ref) => {
              mkref(ref, k);
            }}
            onSelected={(data) => productSelected(data, k)}
          />
        ))}
      </div>
    </React.Fragment>
  );
};
