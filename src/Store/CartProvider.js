import React, { useReducer } from "react";
import CartContext from "./cart-context";

const initialCartState = {
  items: [],
  totalAmount: 0,
};



















const CartReducer = (state, action) => {
  if (action.type === "ADD") {
    const newTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const itemexists = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const exisitingcartitem = state.items[itemexists];
    let updateitem;
    let updateitems;

    if (exisitingcartitem) {
      updateitem = {
        ...exisitingcartitem,
        amount: exisitingcartitem.amount + action.item.amount,
      };
      updateitems = [...state.items];
      updateitems[itemexists] = updateitem;
    } else {
      updateitem = { ...action.item };
      updateitems = state.items.concat(action.item);
    }

    const newCartState = {
      items: updateitems,
      totalAmount: newTotalAmount,
    };
    return newCartState;
  }
  if (action.type === "REMOVE") {
    const itemexists = state.items.findIndex((item) => item.id === action.id);
    const exisitingcartitem = state.items[itemexists];
    const newTotalAmount = state.totalAmount - exisitingcartitem.price;
    let updateitems;

    if (exisitingcartitem.amount === 1) {
      updateitems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updateitem = {
        ...exisitingcartitem,
        amount: exisitingcartitem.amount - 1,
      };
      updateitems = [...state.items];
      updateitems[itemexists] = updateitem;
    }
    const newcart = {
      items: updateitems,
      totalAmount: newTotalAmount,
    };
    return newcart;
  }
  return initialCartState;
};

export default function CartProvider(props) {
  const [CartState, dispatchCart] = useReducer(CartReducer, initialCartState);
  const additemhandler = (item) => {
    dispatchCart({ type: "ADD", item: item });
  };
  const removeitemhandler = (id) => {
    dispatchCart({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: CartState.items,
    totalAmount: CartState.totalAmount,
    addItem: additemhandler,
    removeItem: removeitemhandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}
