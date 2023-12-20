import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  removeFromCart,
  increaseProductQty,
  decreaseProductQty
} from '../redux/actions/cartActions';
import { getProductStock } from '../api'; // Replace with your actual API function

const CartProduct = ({ detail }) => {
  const { id, image, name, price, qty } = detail;
  const dispatch = useDispatch();
  const [stock, setStock] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the product stock when the component mounts
    getProductStock(id)
      .then((response) => setStock(response.stock))
      .catch((error) => setError('Error fetching stock.'));
  }, [id]);

  const removeItemFromCart = () => {
    dispatch(removeFromCart(id));
  };

  const cartIncreaseItem = () => {
    if (stock === null) {
      setError('Fetching stock...');
      return;
    }

    if (stock > 0) {
      dispatch(increaseProductQty(id));
    } else {
      setError('Product is out of stock.');
    }
  };

  const cartDecreaseItem = () => {
    dispatch(decreaseProductQty(id));
  };

  return (
    <>
      <article className="cart-item">
        <img src={image} className="cart-item-img" alt="product" />
        <div className="cart-item-info">
          <h5 className="cart-item-name">{name}</h5>
          <span className="cart-item-price">${price}</span>
          <button
            className="cart-item-remove-btn"
            title="Remove"
            onClick={removeItemFromCart}
          >
            <i className="fa fa-trash" aria-hidden="true"></i>
          </button>
        </div>
        <div>
          <button
            className="cart-item-increase-btn"
            onClick={cartIncreaseItem}
          >
            <i className="fas fa-chevron-up" />
          </button>
          <span className="cart-item-amount">{qty}</span>
          <button
            className={`cart-item-decrease-btn${
              qty === 1 ? ' disabled' : ''
            }`}
            onClick={cartDecreaseItem}
          >
            <i className="fas fa-chevron-down" />
          </button>
        </div>
      </article>
      {error && <p className="error-message">{error}</p>}
    </>
  );
};

export default CartProduct;
