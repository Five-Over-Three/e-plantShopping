import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const calculateTotalAmount = () => {
        let totalCost = cart.reduce((total, item) => total + item.quantity * parseFloat(item.cost.substring(1)), 0);
        return totalCost;
    };

    const handleContinueShopping = (e) => {
        onContinueShopping(e);
    };

    const handleIncrement = (item) => {
        dispatch(updateQuantity({name: item.name, quantity: item.quantity + 1}));
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        } else {
            dispatch(updateQuantity({ name: item.name, quantity: 0 }));
            dispatch(removeItem(item));
        }
    };

    const handleRemove = (item) => {
        dispatch(removeItem(item));
    };

    const calculateTotalCost = (item) => {
        return item.quantity * parseFloat(item.cost.substring(1));
    };

    const handleCheckoutShopping = (e) => {
        alert("Funtionality to be added for future referece");
    };

    return (
        <div className='cart-container'>
            <h2 style={{ color: 'black' }}>Total Cart Amount : ${calculateTotalAmount()}</h2>
            <div>
                {cart.map(item => (
                    <div className="cart-item" key={item.name}>
                        <img className="cart-item-image" src={item.image} alt={item.name} />
                        <div className="cart-item-details">
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-cost">{item.cost}</div>
                            <div className="cart-item-quantity">
                                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                                <span className="cart-item-quantity-value">{item.quantity}</span>
                                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                            </div>
                            <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                            <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '20px', color: 'black' }} className="total_cart_amount"></div>
            <div className="continue_shopping_btn">
                <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
                <br />
                <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
            </div>
        </div >
    );
};

export default CartItem;

                        