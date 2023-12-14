import React from "react";
import "./productCard.scss";
import Product from "../../../../core/models/product";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const { name, img, price, colour } = product;

  return (
    <div className="product-card">
      <div className="product-card__image">
        <img src={img} alt={name} />
      </div>
      <div className="product-card__details">
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__price">${price}</p>
        <p className="product-card__color">Color: {colour}</p>
        <button
          className="product-card__add-btn"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
