import React, { SyntheticEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { api } from "../services/api";
import { setAuthenticate } from "../store/actions";

type Props = React.PropsWithChildren<{}>;

export const Login: React.FC<Props> = () => {
  const initResponse = {
    message: "",
    errors: { username: "", password: "" },
  };
  const [values, setValues] = useState({ username: "", password: "" });
  const [response, setResponse] = useState(initResponse);
  const dispatch = useDispatch();

  const handleChange = (e: SyntheticEvent) => {
    const { id, value } = e.target as HTMLInputElement;
    setValues({ ...values, [id]: value });
  };

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setResponse({ ...initResponse, message: "Aguarde ..." });
    try {
      await api.get("/sanctum/csrf-cookie");
      const res = await api.post<User>("/api/login", values);
      dispatch(setAuthenticate(true, res.data));
      setResponse({ ...initResponse });
    } catch (reason) {
      if (reason.response) {
        setResponse({
          ...response,
          message: reason.response.data.message,
          errors: { ...reason.response.data.errors },
        });
      }
    }
  };

  return (
    <div className="login">
      <div className="header">
        <h1>Optimus</h1>
        <h2>Delivery</h2>
        <h5 onClick={() => console.log(localStorage.getItem("token"))}>
          v1.0.5
        </h5>
      </div>
      <div className="panel-login">
        <div className="logo">
          <img src="assets/delivery-truck.svg" alt="logo" />
        </div>
        <form className="form-login" onSubmit={onSubmit}>
          <div className="field-line">
            <label htmlFor="username" className="form-label">
              Usu&aacute;rio
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="field"
              onChange={handleChange}
              value={values.username}
            />
            {response.errors.username && (
              <div className="field-text error">{response.errors.username}</div>
            )}
          </div>
          <div className="field-line">
            <label htmlFor="password" className="form-label">
              Senha
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="field"
              onChange={handleChange}
              value={values.password}
            />
            {response.errors.password && (
              <div className="field-text error">{response.errors.password}</div>
            )}
          </div>
          <div className="btn-line">
            {response.message && (
              <div className="field-text error">{response.message}</div>
            )}
            <div className="button">
              <button type="submit" className="btn">
                Entrar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
