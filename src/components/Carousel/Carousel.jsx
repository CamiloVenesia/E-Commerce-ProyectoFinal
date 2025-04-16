import React, { useState, useEffect } from 'react';
import './Carousel.css';

// Array de imágenes
const images = [
    "https://d22fxaf9t8d39k.cloudfront.net/5210da715aef435d64cf714f912847e8938ecdcec50dd14664599f27152303d919762.png",
    "https://d22fxaf9t8d39k.cloudfront.net/af18ff7f7b1c2cf596dd95ca03b275c567b8777a2de2a8576ec614862600b62419762.jpg",
    "https://d22fxaf9t8d39k.cloudfront.net/42005d331cfc60cc567cdc59364fdd570b034a4a8447c52ddfd958010b07063019762.jpg",
];

function Carousel() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [transition, setTransition] = useState(false);

    // Función para avanzar a la siguiente imagen
    const nextImage = () => {
        setTransition(true); // Activa la transición
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Función para retroceder a la imagen anterior
    const prevImage = () => {
        setTransition(true); // Activa la transición
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    // Transición automática (suave)
    useEffect(() => {
        const interval = setInterval(() => {
            nextImage(); // Avanza a la siguiente imagen
        }, 5000); // Cambia de imagen cada 5 segundos

        return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
    }, [currentImageIndex]); // Reinicia el intervalo cuando cambia la imagen

    return (
        <div className="carousel">
            <div
                className="carousel-inner"
                style={{
                    transform: `translateX(-${currentImageIndex * 100}%)`,
                    transition: transition ? 'transform 0.5s ease-in-out' : 'none',
                }}
                onTransitionEnd={() => setTransition(false)} // Reinicia la transición al finalizar
            >
                {images.map((image, index) => (
                    <div key={index} className="carousel-slide">
                        <img
                            src={image}
                            alt={`Carrusel ${index + 1}`}
                            className="carousel-image"
                        />
                    </div>
                ))}
            </div>

            {/* Botón para retroceder */}
            <button className="carousel-button prev" onClick={prevImage}>
                &#10094; {/* Flecha izquierda */}
            </button>

            {/* Botón para avanzar */}
            <button className="carousel-button next" onClick={nextImage}>
                &#10095; {/* Flecha derecha */}
            </button>
        </div>
    );
}

export default Carousel;