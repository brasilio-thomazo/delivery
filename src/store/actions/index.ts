import React from "react";

export const clients = {
  insert: (client: Client): AppAction => ({
    type: "INSERT_CLIENT",
    client: { client },
  }),
  setAll: (all: Client[]): AppAction => ({
    type: "SET_CLIENTS",
    client: { all },
  }),
  set: (index: number): AppAction => ({ type: "SET_CLIENT", index }),
  update: (client: Client): AppAction => ({
    type: "UPDATE_CLIENT",
    client: { client },
  }),
};

export const product = {
  insert: (product: Product): AppAction => ({
    type: "INSERT_PRODUCT",
    product: { product },
  }),
  setAll: (all: Product[]): AppAction => ({
    type: "SET_PRODUCTS",
    product: { all },
  }),
  set: (index: number): AppAction => ({ type: "SET_PRODUCT", index }),
  update: (product: Product): AppAction => ({
    type: "UPDATE_PRODUCT",
    product: { product },
  }),

  type: {
    insert: (type: PdtType): AppAction => ({
      type: "INSERT_PDT_TYPE",
      product: { type: { type } },
    }),
    setAll: (all: PdtType[]): AppAction => ({
      type: "SET_PDT_TYPES",
      product: { type: { all } },
    }),
    set: (index: number): AppAction => ({ type: "SET_PDT_TYPE", index }),
    update: (type: PdtType): AppAction => ({
      type: "UPDATE_PDT_TYPE",
      product: { type: { type } },
    }),
  },

  category: {
    insert: (category: PdtCategory): AppAction => ({
      type: "INSERT_PDT_CATEGORY",
      product: { category: { category } },
    }),
    setAll: (all: PdtCategory[]): AppAction => ({
      type: "SET_PDT_CATEGORIES",
      product: { category: { all } },
    }),
    set: (index: number): AppAction => ({ type: "SET_PDT_CATEGORY", index }),
    update: (category: PdtCategory): AppAction => ({
      type: "UPDATE_PDT_CATEGORY",
      product: { category: { category } },
    }),
  },
};

export const setStore = (
  clients: Client[],
  products: Product[],
  payments: Payment[],
  types: PdtType[],
  categories: PdtCategory[]
): AppAction => {
  return {
    type: "SET_STORE",
    client: { all: clients },
    payment: { all: payments },
    product: {
      all: products,
      type: { all: types },
      category: { all: categories },
    },
  };
};

export const setAuthenticate = (
  authenticate: boolean,
  user: User
): AppAction => ({
  type: "SET_AUTHENTICATE",
  authenticate,
  user,
});

export const showSidebar = (
  title: string,
  components?: React.ReactNode[]
): AppAction => {
  return {
    type: "SHOW_SIDEBAR",
    sidebar: { visible: true, components, title },
  };
};

export const hideSidebar = (
  title: string,
  components?: React.ReactNode[]
): AppAction => ({
  type: "HIDE_SIDEBAR",
  sidebar: { visible: false, components, title },
});
