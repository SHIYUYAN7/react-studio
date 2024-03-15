import "./App.css";
import { useState } from "react";
import bakeryData from "./assets/bakery-data.json";
import BakeryItem from './components/BakeryItem';

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
  // use useState to create a state variable to hold the state of the cart
  const [cart, setCart] = useState([]);

  const addToCart = (newItem) => {
    setCart((currentCart) => {
      // check if the item is in the cart
      const existingItemIndex = currentCart.findIndex(item => item.name === newItem.name);
      
      // found then increment its quantity
      if (existingItemIndex >= 0) {
        // Increment the quantity of the existing item
        const newCart = [...currentCart];
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: newCart[existingItemIndex].quantity + 1
        };
        return newCart;
      } else {
        // not found add the new item with a quantity of 1
        return [...currentCart, {...newItem, quantity: 1}];
      }
    });
  };

  const removeFromCart = (itemName) => {
    setCart((currentCart) => {
      return currentCart.reduce((acc, item) => {
        if (item.name === itemName) {
          if (item.quantity > 1) {
            // reduce the quantity
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
        // If quantity is 1, it will not be added back, effectively removing it
        } else {
          // This item is not the one to remove, add back to the new cart
          acc.push(item);
        }
        return acc;
      }, []);
    });
  };

  return (
    <div className="App">
      <h1>My Bakery</h1>

      <div className="container">
        <div className="bakeryCard">
          {bakeryData.map((item, index) => ( // map bakeryData to BakeryItem components
            <BakeryItem key={item.name} item={item} addToCart={addToCart} />
          ))}
        </div>

        <div className="cart">
          <h2>My Cart</h2>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.quantity}x {item.name} - ${item.price.toFixed(2)}
                <button className="cartButton" onClick={() => removeFromCart(item.name)}>Remove</button>
              </li>
            ))}
          </ul>
          <h3>
            Total: $
            {cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
          </h3>
        </div>
      </div>


      
    </div>
  );
}

export default App;
