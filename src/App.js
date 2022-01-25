import React from "react";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import { useState } from "react";
import CartProvider from "./Store/CartProvider";
function App() {
  const [showcart, setshowcart] = useState(false);

  const showcartevent = () => {
    setshowcart(true);
  };
  const closeCartEvent = () => {
    setshowcart(false);
  };
  return (
    <CartProvider>
      {showcart && <Cart onClose={closeCartEvent} />}

      <Header onShowcart={showcartevent} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
