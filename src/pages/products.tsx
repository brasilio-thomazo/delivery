import React from "react";
import { Layout } from "../layout";

import { FormProduct } from "../components/form-product";
import { Products as ProductsView } from "../components/products";

type Props = React.PropsWithChildren<{}>;

export const Products: React.FC<Props> = () => {
  return (
    <Layout>
      <div className="products">
        <FormProduct />
        <ProductsView />
      </div>
    </Layout>
  );
};
