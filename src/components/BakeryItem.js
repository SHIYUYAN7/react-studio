import React from 'react';

const BakeryItem = ({ item, addToCart }) => {
  return (
    <div className="BakeryItem">
        <img src={item.image} alt={item.name} />
        <div className='itemName'>{item.name}</div>
        <p className='itemDescription'>{item.description}</p>
        <div className='itemDetails'>
          <p>${item.price.toFixed(2)}</p>
          <button className="itemButton" onClick={() => addToCart(item)}>Add to Cart</button>
        </div>
        
    </div>
  );
};

export default BakeryItem;