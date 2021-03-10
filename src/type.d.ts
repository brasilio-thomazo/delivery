interface SuggestionRef {
  value: string;
  setValue: (str: string) => void;
  clear: () => void;
}

interface MeResponse {
  error: boolean;
  user: User;
}

interface Payment {
  id: number;
  name: string;
  repay: boolean;
}

interface Order {
  id?: number;
  id_user: number;
  id_client: number;
  id_payment: number;
  price: number;
  cost: number;
  pay: number;
  repay: number;
  observation: string;
  items: OrderItem[];
}

interface OrderItem {
  id?: number;
  id_order?: number;
  cost: number;
  price: number;
  parts: OrderItemPart[];
}

interface OrderItemPart {
  id?: number;
  id_order_item?: number;
  id_product: number;
  cost: number;
  price: number;
}

interface OrderView {
  user: User;
  client: Client;
  payment: Payment;
  price: number;
  cost: number;
  pay: number;
  repay: number;
  observation: string;
  items: OrderViewItem[];
}

interface OrderViewItem {
  price: number;
  cost: number;
  parts: Product[];
}

interface OrderViewState {
  order: OrderView;
  insertItem: (parts: Product[]) => void;
  setClient: (client: Client) => void;
  setPayment: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  setPay: (pay: number | undefined) => void;
  setObservation: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  closeOrder: () => void;
}

interface Printer {
  id: number;
  id_order: number;
  printable: boolean;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Client {
  id: number;
  name: string;
  phone: string;
  address: string;
  addr_number: number;
  addr_complement: string;
}

interface Product {
  id: number;
  id_category: number;
  id_type: number;
  name: string;
  price: number;
  cost: number;
  description: string;
  type: PdtType;
  category: PdtCategory;
}

interface PdtType {
  id: number;
  name: string;
}

interface PdtCategory {
  id: number;
  name: string;
}

interface PlacesRef {
  value: string;
  setValue: (str: string) => void;
  clear: () => void;
}

interface NavLink {
  uri: string;
  text: string;
}

type PdvState = {
  client: Client;
};

type AppState = {
  authenticate: boolean;
  sidebar: { visible: boolean; components?: React.ReactNode[]; title: string };
  links: NavLink[];
  index: number;
  client: {
    all: Client[];
    client: Client;
    index: number;
  };
  product: {
    product: Product;
    all: Product[];
    index: number;
    type: { all: PdtType[]; type: PdtType; index: number };
    category: { all: PdtCategory[]; category: PdtCategory; index: number };
  };
  user: User;
  payment: { all: Payment[]; payment: Payment };
};

type AppAction = {
  type: string;
  sidebar?: { visible: boolean; components?: React.ReactNode[]; title: string };
  authenticate?: boolean;
  index?: number;
  product?: {
    all?: Product[];
    product?: Product;
    type?: { all?: PdtType[]; type?: PdtType };
    category?: { all?: PdtCategory[]; category?: PdtCategory };
  };
  client?: {
    all?: Client[];
    client?: Client;
  };
  user?: User;
  payment?: { all?: Payment[]; payment?: Payment };
};

type DispatchType = (args: AppAction) => AppAction;
