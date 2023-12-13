import Product from "../../../core/models/product";

export interface CartItemModel {
  product: Product;
  qty: number;
}
