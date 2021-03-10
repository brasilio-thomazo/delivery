import axios from "axios";
import { config } from "../config";

export const numberFormat = (n: number) => {
  const intl = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return intl.format(n);
};

interface Feature {
  id: string;
  place_name: string;
  center: Array<number>;
  context: Array<Object>;
  geometry: Object;
}

interface PlaceResponse {
  features: Array<Feature>;
}

const httpPlaces = axios.create({
  baseURL: config.PLACE_URL,
});

export const api = axios.create({
  baseURL: config.APP_BASE_URL,
  withCredentials: true,
  headers: { Accept: "application/json" },
});

export function getText(
  keys: Array<String> = [],
  data: Object = {},
  join = " "
) {
  const array = [] as Array<String>;
  for (let i = 0; i < keys.length; i++) {
    let _data = data;
    if (keys[i].indexOf(".") > 0) {
      const parts = keys[i].split(".");
      for (let x = 0; x < parts.length; x++) {
        _data = _data[parts[x] as keyof Object];
      }
    } else _data = _data[keys[i] as keyof Object];
    array.push(_data.toString());
  }
  return array.join(join);
}

export const placesSearch = (key: string) => {
  let uri = `/${encodeURI(key)}.json`;
  return httpPlaces.get<PlaceResponse>(uri, {
    params: {
      access_token: config.MBX_TOKEN,
      cachebuster: "1614266800421",
      autocomplete: true,
      country: "br",
      types: "address",
      language: "pt",
      proximity: "-46.76467682916416,-23.499345647600578",
    },
  });
};
