import React from "react";

const CartContext = React.createContext({
  items: ["sushi", "burger", "melt"],
  totalAmount: 5,
  addItem: (item) => {},
  removeItem: (id) => {},
});

export default CartContext;
