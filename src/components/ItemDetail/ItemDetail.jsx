import { Link, useParams } from 'react-router-dom';
import './ItemDetail.css';
import { useEffect, useState, useContext } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import Loader from '../Loader/Loader';
import { CartContext } from '../../context/CartContext';
import { Minus, Plus, ShoppingCart } from 'react-feather';
import Notification from '../Notification/Notification';

function ItemDetail() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);

  const { addItem } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'productos', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProducto({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError('Producto no encontrado');
        }
      } catch (err) {
        console.error('Error al cargar producto:', err);
        setError('Error al cargar el producto');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addItem(producto, quantity);
    setShowNotification(true);
  };

  if (loading) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;
  if (!producto) return <div className="error-message">Producto no disponible</div>;

  return (
    <div className="product-detail-container">
      <div className="product-detail-grid">
        <div className="product-image-wrapper">
          <img
            src={producto.img || '/placeholder-product.jpg'}
            alt={producto.nombre}
            className="product-detail-image"
          />
        </div>
        <div className="product-info">
          <h1 className="product-title">{producto.nombre}</h1>
          <p className="product-price">
            {typeof producto.precio === 'number'
              ? `$${producto.precio.toFixed(2)}`
              : 'Precio no disponible'}
          </p>
          <hr className="product-separator" />
          <p className="product-description">{producto.descripcion}</p>
          <hr className="product-separator" />

          <div className="quantity-selector">
            <button
              className="quantity-button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus size={16} />
            </button>
            <span className="quantity-value">{quantity}</span>
            <button
              className="quantity-button"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={producto.stock === 0}
          >
            <ShoppingCart size={16} />
            Agregar al carrito
          </button>

          <Link to="/" className="back-to-home-link">
            Volver al inicio
          </Link>

          <div className="product-details-section">
            <h2 className="details-title">Detalles del producto</h2>
            <div className="details-card">
              <div className="details-content">
                <div className="details-grid">
                  <div className="detail-item">
                    <h3 className="detail-label">Material</h3>
                    <p className="detail-value">{producto.material || 'No especificado'}</p>
                  </div>
                  <hr className="detail-separator" />
                  <div className="detail-item">
                    <h3 className="detail-label">Origen</h3>
                    <p className="detail-value">{producto.origen || 'Argentina'}</p>
                  </div>
                  <hr className="detail-separator" />
                  <div className="detail-item">
                    <h3 className="detail-label">Capacidad</h3>
                    <p className="detail-value">{producto.capacidad || 'No especificado'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showNotification && (
        <Notification
          message="Producto agregado al carrito"
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
}

export default ItemDetail;
