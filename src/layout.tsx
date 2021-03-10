import React from "react";
import { Navbar } from "./components/navbar";
import { SideBar } from "./components/sidebar";

type Props = React.PropsWithChildren<{}>;

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="app">
      <Navbar />
      <SideBar />
      {children}
    </div>
  );
};
