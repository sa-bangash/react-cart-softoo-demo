import CartContainer from "./modules/cart/containers/cartContainer";
import { ProductsContainer } from "./modules/products/containers/productsContainer";
import "./App.scss";
function App() {
  return (
    <div className="app-container">
      <div>
        <ProductsContainer></ProductsContainer>
      </div>
      <div>
        <CartContainer></CartContainer>
      </div>
    </div>
  );
}

export default App;
