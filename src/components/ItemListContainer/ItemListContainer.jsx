import { useEffect, useState } from 'react';
import Item from '../Item/Item';
import Loader from '../Loader/Loader';
import './ItemListContainer.css';
import { useParams } from 'react-router-dom';
import { db } from '../../firebaseConfig.js';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';

function ItemListContainer() {
    const [misProductos, setMisProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { categoria } = useParams();

    useEffect(() => {
        const obtenerProductos = async () => {
            setLoading(true);
            setError(null);
            try {
                const productosRef = collection(db, "productos");
    
                let consulta;
                if (categoria) {
                    consulta = query(
                        productosRef,
                        where("categoria", "==", categoria),
                        orderBy("nombre")  // Orden alfabético
                    );
                } else {
                    consulta = query(productosRef, orderBy("nombre"));
                }
    
                const querySnapshot = await getDocs(consulta);
                const productosFirebase = querySnapshot.docs.map(doc => ({
                    id: doc.id,  // Asegurando que el ID del documento esté incluido
                    ...doc.data()
                }));
    
                setMisProductos(productosFirebase);
            } catch (error) {
                console.error("Error al obtener productos:", error);
                setError("Error al cargar los productos");
            } finally {
                setLoading(false);
            }
        };
    
        obtenerProductos();
    }, [categoria]);

    return (
        <div className="products-container">
            <h1 className="products-title">{categoria ? categoria.toUpperCase() : 'NUESTROS PRODUCTOS'}</h1>
            
            {error && <p className="error-message">{error}</p>}
            
            <div className="products-grid">
                {loading ? (
                    <Loader />
                ) : (
                    misProductos.map(producto => (
                        <Item 
                            key={producto.id} 
                            id={producto.id}
                            nombre={producto.nombre} 
                            precio={producto.precio}
                            descripcion={producto.descripcion} 
                            img={producto.img}
                            stock={producto.stock}
                            oferta={producto.oferta}  // Asegúrate de pasar esta prop
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default ItemListContainer;