import jsonServerProvider from "ra-data-json-server";

export const dataProvider = jsonServerProvider(
  import.meta.env.VITE_API_URL
);