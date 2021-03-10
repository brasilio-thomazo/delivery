import { createStore, Store } from "redux";
import { appState } from "./state";

export const reducer = (state: AppState = appState, action: AppAction) => {
  switch (action.type) {
    case "SET_AUTHENTICATE":
      return setAuthenticate(state, action);

    case "HIDE_SIDEBAR":
    case "SHOW_SIDEBAR":
      return setSidebar(state, action);

    case "SET_STORE":
      return setStore(state, action);

    case "INSERT_CLIENT":
      return clients.insert(state, action);

    case "SET_CLIENTS":
      return clients.setAll(state, action);

    case "SET_CLIENT":
      return clients.set(state, action);

    case "UPDATE_CLIENT":
      return clients.update(state, action);

    case "INSERT_PRODUCT":
      return products.insert(state, action);

    case "SET_PRODUCTS":
      return products.setAll(state, action);

    case "SET_PRODUCT":
      return products.set(state, action);

    case "UPDATE_PRODUCT":
      return products.update(state, action);

    case "INSERT_PDT_TYPE":
      return products.types.insert(state, action);

    case "SET_PDT_TYPE":
      return products.types.set(state, action);

    case "SET_PDT_TYPES":
      return products.types.setAll(state, action);

    case "UPDATE_PDT_TYPE":
      return products.types.update(state, action);

    case "INSERT_PDT_CATEGORY":
      return products.categories.insert(state, action);

    case "SET_PDT_CATEGORIES":
      return products.categories.setAll(state, action);

    case "SET_PDT_CATEGORY":
      return products.categories.set(state, action);

    case "UPDATE_PDT_CATEGORY":
      return products.categories.update(state, action);

    default:
      return state;
  }
};

export const store: Store<AppState, AppAction> & {
  dispatch: DispatchType;
} = createStore(reducer);

const setStore = (
  state: AppState,
  { product, client, payment }: AppAction
): AppState => {
  if (
    !product?.all ||
    !product?.type?.all ||
    !product.category?.all ||
    !client?.all ||
    !payment?.all
  )
    return state;

  return {
    ...state,
    client: { ...state.client, all: client.all },
    payment: { ...state.payment, all: payment.all },
    product: {
      ...state.product,
      all: product.all,
      type: { ...state.product.type, all: product.type.all },
      category: { ...state.product.category, all: product.category.all },
    },
  };
};

const setAuthenticate = (
  state: AppState,
  { authenticate, user }: AppAction
): AppState => {
  if (!authenticate || !user) return state;
  return { ...state, user, authenticate };
};

const setSidebar = (state: AppState, { sidebar }: AppAction): AppState => {
  if (!sidebar) return state;
  return { ...state, sidebar };
};

const clients = {
  insert(state: AppState, { client }: AppAction): AppState {
    if (!client?.client) return state;
    const all = state.client.all;
    all.push(client.client);
    return { ...state, client: { ...state.client, all } };
  },

  setAll(state: AppState, { client }: AppAction): AppState {
    if (!client?.all) return state;
    return { ...state, client: { ...state.client, all: client.all } };
  },

  set(state: AppState, { index }: AppAction): AppState {
    if (typeof index !== "number") return state;
    return {
      ...state,
      client: { ...state.client, client: state.client.all[index], index },
    };
  },

  update(state: AppState, { client }: AppAction): AppState {
    if (!client?.client) return state;

    const all = state.client.all;
    all[state.client.index] = client.client;
    return { ...state, client: { ...state.client, all } };
  },
};

const products = {
  insert(state: AppState, { product }: AppAction): AppState {
    if (!product || !product?.product) return state;
    const all = state.product.all;
    all.push(product.product);
    return { ...state, product: { ...state.product, all } };
  },

  setAll(state: AppState, { product }: AppAction): AppState {
    if (!product || !product.all) return state;
    return { ...state, product: { ...state.product, all: product.all } };
  },

  set(state: AppState, { index }: AppAction): AppState {
    if (typeof index !== "number") return state;
    return {
      ...state,
      product: { ...state.product, product: state.product.all[index], index },
    };
  },

  update(state: AppState, { product }: AppAction): AppState {
    if (!product?.product) return state;

    const all = state.product.all;
    all[state.product.index] = product.product;
    return { ...state, product: { ...state.product, all } };
  },

  types: {
    insert(state: AppState, { product }: AppAction): AppState {
      if (!product?.type?.type || !product.type) return state;
      const all = state.product.type.all;
      all.push(product.type.type);
      return {
        ...state,
        product: {
          ...state.product,
          type: { ...state.product.type, all },
        },
      };
    },

    setAll(state: AppState, { product }: AppAction): AppState {
      if (!product?.type?.all || !product.type) return state;
      return {
        ...state,
        product: {
          ...state.product,
          type: { ...state.product.type, all: product.type.all },
        },
      };
    },

    set(state: AppState, { index }: AppAction): AppState {
      if (typeof index !== "number") return state;
      return {
        ...state,
        product: {
          ...state.product,
          type: {
            ...state.product.type,
            type: state.product.type.all[index],
            index,
          },
        },
      };
    },

    update(state: AppState, { product }: AppAction): AppState {
      if (!product?.type?.type || !product.type) return state;

      const all = state.product.type.all;
      all[state.product.type.index] = product.type.type;
      return {
        ...state,
        product: {
          ...state.product,
          type: { ...state.product.type, all },
        },
      };
    },
  },
  categories: {
    insert(state: AppState, { product }: AppAction): AppState {
      if (!product?.category?.category || !product.category) return state;
      const all = state.product.category.all;
      all.push(product.category.category);
      return {
        ...state,
        product: {
          ...state.product,
          category: { ...state.product.category, all },
        },
      };
    },

    setAll(state: AppState, { product }: AppAction): AppState {
      if (!product?.category?.all || !product.category) return state;
      return {
        ...state,
        product: {
          ...state.product,
          category: { ...state.product.category, all: product.category.all },
        },
      };
    },

    set(state: AppState, { index }: AppAction): AppState {
      if (typeof index !== "number") return state;
      return {
        ...state,
        product: {
          ...state.product,
          category: {
            ...state.product.category,
            category: state.product.category.all[index],
            index,
          },
        },
      };
    },

    update(state: AppState, { product }: AppAction): AppState {
      if (!product?.category?.category || !product.category) return state;

      const all = state.product.category.all;
      all[state.product.category.index] = product.category.category;
      return {
        ...state,
        product: {
          ...state.product,
          category: { ...state.product.category, all },
        },
      };
    },
  },
};
