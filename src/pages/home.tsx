import React from "react";
import { Layout } from "../layout";

type Props = React.PropsWithChildren<{}>;

export const Home: React.FC<Props> = () => {
  return (
    <Layout>
      <h1>Home</h1>
    </Layout>
  );
};
