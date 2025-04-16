import React, { useEffect, useState } from 'react';
import './Slider.css'; // Importa los estilos del Slider

const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slides = [
        "6 CUOTAS SIN INTERÉS CON TODOS LOS BANCOS💳",
        "ENVÍOS GRATIS A TODO EL PAÍS🚚",
        "OFERTAS EXCLUSIVAS",
        // Agrega más frases aquí
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 5000); // Cambia de slide cada 3 segundos

        return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
    }, [slides.length]);

    return (
        <div className="slider-container">
            <div
                className="slider-track"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div key={index} className="slide">
                        {slide}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Slider; // Exporta el componente Slider