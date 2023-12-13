import Product from "../../../core/models/product";
export type FetchCartProductParam = {
  colour: string;
};
export const fetchCartProduct = async (
  param?: FetchCartProductParam
): Promise<Array<Product>> => {
  const queryParams = new URLSearchParams();
  if (param && param.colour) {
    queryParams.append("colour", param.colour);
  }
  try {
    const response = await fetch(
      `https://my-json-server.typicode.com/benirvingplt/products/products?${queryParams.toString()}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    throw new Error(`Error fetching data: ${error}`);
  }
};
