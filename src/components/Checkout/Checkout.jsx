import React, { useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './Checkout.css';

function Checkout() {
    const { cart, clearCart, getCartTotal } = useContext(CartContext);
    const navigate = useNavigate();
    const [orderId, setOrderId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            // Crear la orden en Firebase
            const orden = {
                buyer: formData,
                items: cart.map(item => ({
                    id: item.id,
                    nombre: item.nombre,
                    precio: item.precio,
                    cantidad: item.quantity
                })),
                total: getCartTotal(),
                fecha: serverTimestamp(),
                estado: "confirmada"
            };

            const ordersRef = collection(db, "ordenes");
            const docRef = await addDoc(ordersRef, orden);
            
            setOrderId(docRef.id);
            clearCart();
            
        } catch (error) {
            console.error("Error al crear la orden:", error);
            setError("Error al procesar la orden. Por favor intente nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    if (orderId) {
        return (
            <div className="checkout-container">
                <h2>¡Compra Exitosa!</h2>
                <p className="order-success">Tu número de orden es: <strong>{orderId}</strong></p>
                <p>Recibirás un correo con los detalles de tu compra.</p>
                <button onClick={() => navigate('/')} className="back-button">
                    Volver al inicio
                </button>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <h2>Finalizar Compra</h2>
            
            {error && <p className="error-message">{error}</p>}
            
            <form onSubmit={handleSubmit} className="checkout-form">
                <label>
                    Nombre:
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                    />
                </label>
                
                <label>
                    Email:
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                </label>
                
                <label>
                    Teléfono:
                    <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        required 
                    />
                </label>
                
                <label>
                    Dirección:
                    <input 
                        type="text" 
                        name="address" 
                        value={formData.address} 
                        onChange={handleChange} 
                        required 
                    />
                </label>
                
                <button 
                    type="submit" 
                    className="submit-button"
                    disabled={loading}
                >
                    {loading ? 'Procesando...' : 'Confirmar Compra'}
                </button>
            </form>
        </div>
    );
}

export default Checkout;
