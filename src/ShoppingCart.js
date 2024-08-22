import React, { useReducer } from 'react';
import './ShoppingCart.css';

const initialState = {
    cart: [],
};


function reducer(state, action) {
    switch (action.type) {
        case 'ADD_ITEM':
            
            const existingItem = state.cart.find(item => item.id === action.item.id);
            if (existingItem) {
                
                return {
                    cart: state.cart.map(item =>
                        item.id === action.item.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            } else {
                
                return { cart: [...state.cart, { ...action.item, quantity: 1 }] };
            }
        case 'UPDATE_QUANTITY':
            return {
                cart: state.cart.map(item =>
                    item.id === action.id ? { ...item, quantity: action.quantity } : item
                ),
            };
        case 'REMOVE_ITEM':
            return { cart: state.cart.filter(item => item.id !== action.id) };
        default:
            return state;
    }
}

function ShoppingCart() {
    const [state, dispatch] = useReducer(reducer, initialState);

    
    const addItem = (item) => {
        dispatch({ type: 'ADD_ITEM', item });
    };

    
    const updateQuantity = (id, quantity) => {
        dispatch({ type: 'UPDATE_QUANTITY', id, quantity });
    };

    
    const removeItem = (id) => {
        dispatch({ type: 'REMOVE_ITEM', id });
    };

    return (
        <div className="shopping-cart">
            <h1>Shopping Cart</h1>
            <div className="buttons">
                <button onClick={() => addItem({ id: 1, name: 'Milk', price: 2.50 })}>Milk</button>
                <button onClick={() => addItem({ id: 2, name: 'Bread', price: 1.50 })}>Bread</button>
                <button onClick={() => addItem({ id: 3, name: 'Eggs', price: 3.00 })}>Eggs</button>
                <button onClick={() => addItem({ id: 4, name: 'Sugar', price: 1.20 })}>Sugar</button>
                <button onClick={() => addItem({ id: 5, name: 'Chocolate', price: 2.00 })}>Chocolate</button>
            </div>
            <div className="cart-items">
                {state.cart.length > 0 ? (
                    state.cart.map(item => (
                        <div key={item.id} className="cart-item">
                            <span className="item-name">{item.name}</span>
                            <span className="item-price">${item.price.toFixed(2)}</span>
                            <input
                                type="number"
                                value={item.quantity}
                                onChange={e => updateQuantity(item.id, Number(e.target.value))}
                                min="1"
                            />
                            <button onClick={() => removeItem(item.id)} className="remove-button">Remove</button>
                        </div>
                    ))
                ) : (
                    <p className="empty-cart">Your cart is empty.</p>
                )}
            </div>
            <div className="total">
                Total: ${state.cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
            </div>
        </div>
    );
}

export default ShoppingCart;
