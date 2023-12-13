import Product from "../../../../core/models/product";
import "./cartProduct.scss";
interface CartProductProps {
  product: Product;
}

export const CartProduct: React.FC<CartProductProps> = ({
  product,
}: CartProductProps) => {
  return (
    <div className="cart-product">
      <img src={product.img} className="cart-product__image" alt={product.name}></img>
      <div className="cart-product__detail">
        <div className="cart-product__name">{product.name}</div>
        <div className="cart-product__price">$ {product.price}</div>
      </div>
    </div>
  );
};
