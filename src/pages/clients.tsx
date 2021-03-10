import React from "react";
import { Layout } from "../layout";

import { Form } from "../components/form-client";
import { Clients as ClientsView } from "../components/clients";

type Props = React.PropsWithChildren<{}>;

export const Clients: React.FC<Props> = () => {
  return (
    <Layout>
      <div className="clients">
        <Form />
        <ClientsView />
      </div>
    </Layout>
  );
};
