export const appState: AppState = {
  authenticate: false,
  sidebar: {
    visible: false,
    title: "",
  },
  index: -1,
  payment: {
    all: [],
    payment: {
      id: 1,
      name: "",
      repay: true,
    },
  },
  product: {
    all: [],
    index: -1,
    product: {
      id: -1,
      id_category: -1,
      id_type: -1,
      name: "",
      description: "",
      cost: 0,
      price: 0,
      type: {
        id: -1,
        name: "",
      } as PdtType,
      category: {
        id: -1,
        name: "",
      } as PdtCategory,
    },
    type: {
      all: [],
      type: {
        id: -1,
        name: "",
      } as PdtType,
      index: -1,
    },
    category: {
      all: [],
      category: {
        id: -1,
        name: "",
      } as PdtCategory,
      index: -1,
    },
  },
  client: {
    all: [],
    client: {
      id: -1,
      name: "",
      address: "",
      phone: "",
      addr_complement: "",
      addr_number: 0,
    } as Client,
    index: -1,
  },
  user: {} as User,
  links: [
    { uri: "/", text: "Home" },
    { uri: "/pdv", text: "PDV" },
    //{ uri: "/users", text: "Usu&aacute;rios" },
    { uri: "/clients", text: "Clientes" },
    { uri: "/products", text: "Produtos" },
  ],
};
