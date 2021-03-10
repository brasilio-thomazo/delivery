import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Link } from "react-router-dom";

type Props = React.PropsWithChildren<{}>;

export const Navbar: React.FC<Props> = () => {
  const { links } = useSelector((state: AppState) => state, shallowEqual);
  return (
    <div className="navbar">
      <div className="brand">
        <Link to="/">Delivery</Link>
      </div>
      <button className="bars">
        <span className="fas fa-bars"></span>
      </button>
      <ul className="nav-links">
        {links.map((link, i) => (
          <li key={i}>
            <Link to={link.uri}>{link.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
