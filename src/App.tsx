import CartContainer from "./modules/cart/containers/cartContainer";
import { ProductsContainer } from "./modules/products/containers/productsContainer";
import "./App.scss";
import { CartProvider } from "./modules/cart/context/cartContext";
function App() {
  return (
    <CartProvider>
      <div className="app-container">
        <div>
          <ProductsContainer></ProductsContainer>
        </div>
        <div>
          <CartContainer></CartContainer>
        </div>
      </div>
    </CartProvider>
  );
}

export default App;
