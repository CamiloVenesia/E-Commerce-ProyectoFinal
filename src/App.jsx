import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from './context/CartContext.jsx';
import Cart from "./components/Cart/Cart.jsx";
import './App.css';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import Navbar from "./components/Navbar/Navbar";
import Carousel from './components/Carousel/Carousel';
import Slider from './components/Slider/Slider';
import ItemDetail from './components/ItemDetail/ItemDetail';
import NotFound from './components/NotFound/NotFound';
import Checkout from './components/Checkout/Checkout.jsx';
import Footer from './components/Footer/Footer.jsx';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <main className="main-content" style={{
          flex: 1,
          padding: '20px 0'
        }}>
          <Routes>
            <Route path="/" element={
              <>
                <Carousel />
                <Slider />
                <ItemListContainer />
              </>
            } />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/categoria/:categoria" element={<ItemListContainer />} />
            <Route path="/detalle/:id" element={<ItemDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}



const mainContentStyle = {
  flex: 1,
  padding: '20px 0'
};

export default App;
