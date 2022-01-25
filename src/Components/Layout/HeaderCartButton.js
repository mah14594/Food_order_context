import React, { useContext } from "react";
import CartContext from "../../Store/cart-context.js";
import CartIcon from "./CartIcon.js";
import classes from "./HeaderCartButton.module.css";

export default function HeaderCartButton(props) {
  const CartCtx = useContext(CartContext);
  const CartAmount = CartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{CartAmount}</span>
    </button>
  );
}
