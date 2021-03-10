import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/app";
//import reportWebVitals from "./reportWebVitals";
import { store } from "./store";

//import "./sass/delivery.scss";
import { api } from "./services";
import { Provider } from "react-redux";

const el = document.getElementById("app");
console.log(process);

const init = async () => {
  const res = await api.get<MeResponse>("/api/me");
  const state = store.getState();
  state.authenticate = !res.data.error;
  state.user = !res.data.error ? res.data.user : ({} as User);
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    el
  );
};

init();
//reportWebVitals();
