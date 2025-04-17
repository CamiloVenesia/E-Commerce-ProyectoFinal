// src/components/CartWidget/CartWidget.jsx
import './CartWidget.css';
import { IoMdCart } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from "../../context/CartContext";

function CartWidget() {
    const { getTotalQuantity } = useContext(CartContext);

    const quantity = getTotalQuantity();

    return (
        <Link to="/cart" className="cart-widget-link">
            <div className="cart-widget-container">
                <IoMdCart className="nav-cart" />
                {quantity > 0 && (
                    <span className="cart-widget-counter">{quantity}</span>
                )}
            </div>
        </Link>
    );
}

export default CartWidget;
