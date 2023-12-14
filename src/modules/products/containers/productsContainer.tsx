import { useEffect, useState } from "react";
import Product from "../../../core/models/product";
import { FetchCartProductParam, fetchCartProduct } from "../api/fetchProducts";
import ProductCard from "../components/productCard/productCard";
import { ProductFilter } from "../components/productFilter/productFilter";
import "./productsContainer.scss";
import { useCart } from "../../cart/store/cartContext";
export const ProductsContainer: React.FC = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (param?: FetchCartProductParam) => {
    setLoading(true);
    const data = await fetchCartProduct(param);
    setLoading(false);
    setProducts(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onColourChange = (selectedColor: string) => {
    fetchData({ colour: selectedColor });
  };

  const onAddToCart = (product: Product) => {
    addToCart(product);
  };
  return (
    <>
      <ProductFilter onColourChange={onColourChange}></ProductFilter>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className="products">
          {products.map((product) => (
            <ProductCard
              product={product}
              onAddToCart={onAddToCart}
              key={product.id}
            ></ProductCard>
          ))}
        </div>
      )}
    </>
  );
};
