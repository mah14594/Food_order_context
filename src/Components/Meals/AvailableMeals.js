import React from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useState, useEffect, useCallback } from "react";

export default function AvailableMeals() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [meals, setmeals] = useState([]);
  const fetchmealsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://food-order-app-b0ebf-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      const datakeys = Object.keys(data);
      const datavalues = Object.values(data);
      const loadedmeals = [];
      for (const datakey in datakeys) {
        loadedmeals.push({
          id: datakey,
          name: datavalues[datakey][datakey].name,
          price: datavalues[datakey][datakey].price,
          description: datavalues[datakey][datakey].description,
        });
      }
      setmeals(loadedmeals);
      //     setmeals(loadedmeals);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchmealsHandler();
  }, [fetchmealsHandler]);
  // const [meals, setmeals] = useState([]);
  // const { isLoading, error, RequestData: fetchmeals } = useHttp();
  // useEffect(() => {
  //   const requestobject = {
  //     url: "https://food-order-app-b0ebf-default-rtdb.firebaseio.com/meals.json",
  //   };
  //   const datafunc = (data) => {
  //     const datakeys = Object.keys(data);
  //     const datavalues = Object.values(data);
  //     const loadedmeals = [];
  //     for (const datakey in datakeys) {
  //       loadedmeals.push({
  //         id: datakey,
  //         name: datavalues[datakey][datakey].name,
  //         price: datavalues[datakey][datakey].price,
  //         description: datavalues[datakey][datakey].description,
  //       });
  //     }
  //     setmeals(loadedmeals);
  //   };
  //   fetchmeals(requestobject, datafunc);
  // }, [fetchmeals]);
  // console.log(meals);
  const mealslist = meals.map((meal, index) => {
    return (
      <MealItem
        key={index}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });
  let content = <div>{mealslist}</div>;
  if (isLoading) {
    content = <div>Please Wait! , Meals list is loading</div>;
  }
  if (error) {
    content = (
      <div>Something Went Wrong! we will fix it as soon as possible</div>
    );
  }

  return <Card className={classes.meals}>{content}</Card>;
}
