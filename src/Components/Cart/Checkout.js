import React from "react";
import classes from "./Checkout.module.css";
import useInput from "../Hooks/use-input";
import { useState } from "react/cjs/react.development";
import useHttp from "../Hooks/use-http";
export default function Checkout(props) {
  //useInput hook htmlFor=name field
  const {
    value: enteredname,
    valueisvalid: nameisValid,
    istouched: nameistouched,
    reset: namereset,
    changeinput: changename,
    blurhandler: blurnamehandler,
  } = useInput((value) => {
    return value.trim().length > 0;
  });
  //useInput hook htmlFor=phone field
  const {
    value: enteredphone,
    valueisvalid: phoneisValid,
    istouched: phoneistouched,
    reset: phonereset,
    changeinput: changephone,
    blurhandler: blurphonehandler,
  } = useInput((value) => {
    return value.trim().length === 10;
  });
  //useInput hook htmlFor=address field
  const addressexpression = /[0-9]{2,6} [A-Za-z]{3,}/; //regular expression htmlFor=address

  const {
    value: enteredaddress,
    valueisvalid: addressisValid,
    istouched: addressistouched,
    reset: addressreset,
    changeinput: changeaddress,
    blurhandler: bluraddresshandler,
  } = useInput((value) => {
    return addressexpression.test(value);
  });
  //useInput hook htmlFor=city field
  const {
    value: enteredcity,
    valueisvalid: cityisValid,
    istouched: cityistouched,
    reset: citysreset,
    changeinput: changecity,
    blurhandler: blurcityhandler,
  } = useInput((value) => {
    return value.trim().length > 4;
  });

  //useInput hook htmlFor=address field
  const {
    value: enteredZip,
    valueisvalid: ZipisValid,
    istouched: Zipistouched,
    reset: Zipreset,
    changeinput: changeZip,
    blurhandler: blurZiphandler,
  } = useInput((value) => {
    return value.trim().length === 4;
  });
  const [submittingerror, setsubmittingerror] = useState(false);
  const [datasubmitted, setdatasubmitted] = useState(false);
  const { isLoading, error, RequestData: sendcartdata } = useHttp();
  const cartdata = props.cartinfo;
  const submitFormHandler = (event) => {
    event.preventDefault();
    if (error) {
      setsubmittingerror(true);
      return;
    } else {
      const requestobject = {
        url: "https://food-order-app-b0ebf-default-rtdb.firebaseio.com/cart.json",
        method: "Post",
        body: {
          name: { enteredname },
          phone: { enteredphone },
          city: { enteredcity },
          address: { enteredaddress },
          zip: { enteredZip },
          cartitems: cartdata.itemlist,
          totalprice: cartdata.totalamount,
        },
      };

      sendcartdata(requestobject);
      namereset();
      phonereset();
      addressreset();
      citysreset();
      Zipreset();
      setdatasubmitted(true);
    }
  };
  const FormisValid =
    nameisValid && phoneisValid && addressisValid && cityisValid && ZipisValid;

  let contents = (
    <form className="row g-3" onSubmit={submitFormHandler}>
      <div className="col-md-6">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          autoComplete="off"
          type="text"
          className="form-control"
          id="name"
          value={enteredname}
          onChange={changename}
          onBlur={blurnamehandler}
        />
        {nameistouched && !nameisValid && (
          <small className={classes.error}>Enter Your name please!</small>
        )}
      </div>
      <div className="col-md-6">
        <label htmlFor="Phone" className="form-label">
          Phone Number
        </label>
        <input
          autoComplete="off"
          type="phone"
          className="form-control"
          id="Phone"
          value={enteredphone}
          onChange={changephone}
          onBlur={blurphonehandler}
        />
        {phoneistouched && !phoneisValid && (
          <small className={classes.error}>
            phone number must be of 10 digits
          </small>
        )}
      </div>
      <div className="col-12">
        <label htmlFor="inputAddress" className="form-label">
          Address
        </label>
        <input
          autoComplete="off"
          type="text"
          className="form-control"
          id="inputAddress"
          value={enteredaddress}
          onChange={changeaddress}
          onBlur={bluraddresshandler}
        />
        {addressistouched && !addressisValid && (
          <small className={classes.error}>
            starts with the street number and ends with street name with a space
            between them
          </small>
        )}
      </div>

      <div className="col-md-6">
        <label htmlFor="inputCity" className="form-label">
          City
        </label>
        <input
          autoComplete="off"
          type="text"
          className="form-control"
          id="inputCity"
          value={enteredcity}
          onChange={changecity}
          onBlur={blurcityhandler}
        />
        {cityistouched && !cityisValid && (
          <small className={classes.error}>
            City name must be more than 4 letters
          </small>
        )}
      </div>
      <div className="col-md-2">
        <label htmlFor="inputZip" className="form-label">
          Zip
        </label>
        <input
          autoComplete="off"
          type="text"
          className="form-control"
          id="inputZip"
          value={enteredZip}
          onChange={changeZip}
          onBlur={blurZiphandler}
        />
        {Zipistouched && !ZipisValid && (
          <small className={classes.error}>Zip Code must have 4 digits</small>
        )}
      </div>
      <div className={classes.actions}>
        <button
          className={classes["button--alt"]}
          onClick={props.gotocarthandler}
        >
          Go Back to cart
        </button>

        <button
          disabled={!FormisValid}
          type="submit"
          className={classes.button}
        >
          Confirm Order
        </button>
      </div>
    </form>
  );
  // if (submittingerror) {
  //   content = <p>Error occured in submitting data , try again</p>;
  // }
  // if (datasubmitted) {
  //   content = (
  //     <p>
  //       your order was successfully copmleted , thank you for dealing with us
  //     </p>
  //   );
  // }
  return (
    <form className="row g-3" onSubmit={submitFormHandler}>
      <div className="col-md-6">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          autoComplete="off"
          type="text"
          className="form-control"
          id="name"
          value={enteredname}
          onChange={changename}
          onBlur={blurnamehandler}
        />
        {nameistouched && !nameisValid && (
          <small className={classes.error}>
            Name should have more than 3 letters
          </small>
        )}
      </div>
      <div className="col-md-6">
        <label htmlFor="Phone" className="form-label">
          Phone Number
        </label>
        <input
          autoComplete="off"
          type="phone"
          className="form-control"
          id="Phone"
          value={enteredphone}
          onChange={changephone}
          onBlur={blurphonehandler}
        />
        {phoneistouched && !phoneisValid && (
          <small className={classes.error}>
            phone number must be of 10 digits
          </small>
        )}
      </div>
      <div className="col-12">
        <label htmlFor="inputAddress" className="form-label">
          Address
        </label>
        <input
          autoComplete="off"
          type="text"
          className="form-control"
          id="inputAddress"
          value={enteredaddress}
          onChange={changeaddress}
          onBlur={bluraddresshandler}
        />
        {addressistouched && !addressisValid && (
          <small className={classes.error}>
            starts with the street number and ends with street name with a space
            between them
          </small>
        )}
      </div>

      <div className="col-md-6">
        <label htmlFor="inputCity" className="form-label">
          City
        </label>
        <input
          autoComplete="off"
          type="text"
          className="form-control"
          id="inputCity"
          value={enteredcity}
          onChange={changecity}
          onBlur={blurcityhandler}
        />
        {cityistouched && !cityisValid && (
          <small className={classes.error}>
            City name must be more than 4 letters
          </small>
        )}
      </div>
      <div className="col-md-2">
        <label htmlFor="inputZip" className="form-label">
          Zip
        </label>
        <input
          autoComplete="off"
          type="text"
          className="form-control"
          id="inputZip"
          value={enteredZip}
          onChange={changeZip}
          onBlur={blurZiphandler}
        />
        {Zipistouched && !ZipisValid && (
          <small className={classes.error}>Zip Code must have 4 digits</small>
        )}
      </div>
      <div className={classes.actions}>
        <button
          className={classes["button--alt"]}
          onClick={props.gotocarthandler}
        >
          Go Back to cart
        </button>

        <button
          disabled={!FormisValid}
          type="submit"
          className={classes.button}
        >
          Confirm Order
        </button>
      </div>
      {submittingerror && <h4>Error occured in submitting data , try again</h4>}
      {datasubmitted && (
        <h4>
          your order was successfully copmleted , thank you for dealing with us{" "}
        </h4>
      )}
    </form>
  );
}
