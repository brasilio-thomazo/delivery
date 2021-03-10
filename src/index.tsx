import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/app";
import { store } from "./store";
import { api } from "./services";
import { Provider } from "react-redux";

const el = document.getElementById("app");
console.log(process);
console.log(process.env.APP_NAME);

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
