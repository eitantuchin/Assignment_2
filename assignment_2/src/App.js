import React, {useState, useEffect} from "react";
import {Browse} from "./Browse";
import {Cart} from "./Cart";
import {Confirmation} from "./Confirmation";

export function App() {
  const [productPrices, setProductPrices] = useState([]);
  const [page, changePage] = useState("Browse");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState([]);
  
  useEffect(() => {
    fetch("./products.json")
      .then((response) => response.json())
      .then((json) => {
        json = json.products;
        setProducts(json);
        setCart(Object.fromEntries(json.map((product) => [product.name, 0])));
        setProductPrices(
          Object.fromEntries(
            json.map((product) => [product.name, product.price])
          )
        );
      });
  }, []);

  function resetCart(productName) {
    setCart((prevState) => ({
      ...prevState,
      [productName]: 0,
    }));
  }
  
  function addToCart(productName) {
    setCart((prevState) => ({
      ...prevState,
      [productName]: cart[productName] + 1,
    }));
  }

  function removeFromCart(productName) {
    setCart((prevState) => ({
      ...prevState,
      [productName]: Math.max(0, cart[productName] - 1),
    }));
  }

  return (
    <div>
      <Browse
        isActive={page === "Browse"}
        changePage={changePage}
        cart={cart}
        removeFromCart={removeFromCart}
        addToCart={addToCart}
        productPrices={productPrices}
        products={products}
      />
      <Cart
        isActive={page === "Cart"}
        changePage={changePage}
        cart={cart}
        productPrices={productPrices}
        order={order}
      />
      <Confirmation
        isActive={page === "Confirmation"}
        changePage={changePage}
        resetCart={resetCart}
        cart={cart}
        productPrices={productPrices}
        order={order}
      />
    </div>
  );
}