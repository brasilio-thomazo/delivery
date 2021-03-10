export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Client {
  id: number;
  name: string;
  phone: string;
  address: string;
  addr_number: number;
  addr_complement: string | null;
}

export interface Product {
  id: number;
  id_category: number;
  id_type: number;
  name: string;
  price: number;
  cost: number;
  type: ProductType;
  category: ProductCategory;
}

export interface ProductType {
  id: number;
  name: string;
}

export interface ProductCategory {
  id: number;
  name: string;
}

export interface PlacesRef {
  value: string;
  setValue: (str: string) => void;
  clear: () => void;
}
