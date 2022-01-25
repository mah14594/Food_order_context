import React from "react";
import Classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import mealsimage from "./meals.jpg";
export default function Header(props) {
  return (
    <React.Fragment>
      <header className={Classes.header}>
        <h1>React Meals</h1>
        <HeaderCartButton onClick={props.onShowcart}></HeaderCartButton>
      </header>
      <div className={Classes["main-image"]}>
        <img src={mealsimage} alt="table full of food" />
      </div>
    </React.Fragment>
  );
}
