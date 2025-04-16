import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import Notification from '../Notification/Notification';
import './Item.css';

function Item({ id, nombre, precio, img, stock }) {
    const [showNotification, setShowNotification] = useState(false);
    const { addItem } = useContext(CartContext);

    function agregarAlCarrito() {
        addItem({
            id,
            nombre,
            precio,
            img,
            stock
        }, 1); // Cantidad fija: 1
        setShowNotification(true);
    }

    return (
        <div className="card">
            <div className="card-image-container">
                <img 
                    src={img || '/src/assets/placeholder-product.jpg'} 
                    alt={nombre} 
                    className="card-image"
                />
            </div>
            <h2 className="card-title">{nombre || "NO HAY STOCK"}</h2>
            <h3 className="card-price">${precio || "SIN PRECIO"}</h3>

            <div className="card-buttons">
                <button 
                    className="card-btn add-btn" 
                    onClick={agregarAlCarrito}
                    disabled={stock === 0}
                >
                    Agregar al carrito
                </button>
                <Link to={`/detalle/${id}`}>
                    <button className="card-btn view-btn">
                        Ver detalle
                    </button>
                </Link>
            </div>

            {showNotification && (
                <Notification 
                    message="Producto agregado al carrito" 
                    onClose={() => setShowNotification(false)} 
                />
            )}
        </div>
    );
};

export default Item;