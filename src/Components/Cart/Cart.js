import React, { useContext } from "react";
import { useState } from "react/cjs/react.development";
import CartContext from "../../Store/cart-context";
import Checkout from "./Checkout";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

export default function Cart(props) {
  const [checkout, setcheckout] = useState(false);
  const CartCtx = useContext(CartContext);
  const hasitems = CartCtx.items.length > 0;
  const TotalAmount = `$${CartCtx.totalAmount.toFixed(2)}`;
  const CartitemsList = CartCtx.items;
  const Additemhandler = (item) => {
    CartCtx.addItem({ ...item, amount: 1 });
  };
  const Removeitemhandler = (id) => {
    CartCtx.removeItem(id);
  };
  const CartItems = (
    <ul className={classes["cart-items"]}>
      {CartitemsList.map((item, index) => (
        <CartItem
          key={index}
          id={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={Removeitemhandler.bind(null, item.id)}
          onAdd={Additemhandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const showcheckouthandler = () => {
    setcheckout(true);
  };
  let content = (
    <div>
      {CartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{TotalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasitems && (
          <button onClick={showcheckouthandler} className={classes.button}>
            proceed to checkout
          </button>
        )}
      </div>
    </div>
  );
  const gobackcart = () => {
    setcheckout(false);
  };
  const itemslist = [];
  for (const i in CartitemsList) {
    itemslist.push({
      itemname: CartitemsList[i].name,
      itemamount: CartitemsList[i].amount,
      itemprice: CartitemsList[i].price,
    });
  }
  const cartdata = { itemlist: { itemslist }, totalamount: { TotalAmount } };
  if (checkout) {
    content = (
      <div className={classes.checkoutform}>
        {checkout && (
          <Checkout cartinfo={cartdata} gotocarthandler={gobackcart} />
        )}
      </div>
    );
  }

  return <Modal onClose={props.onClose}>{content}</Modal>;
}
