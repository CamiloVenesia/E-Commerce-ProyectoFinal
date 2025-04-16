import React from 'react';
import './Footer.css';


import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          
          {/* Columna 1 - Logo */}
          <div className="footer-col">
            <h2 className="footer-title">La Matera</h2>
            <p className="footer-description">
              Ofrecemos productos artesanales de la más alta calidad para los amantes del mate argentino.
            </p>
          </div>

          {/* Columna 2 - Productos */}
          <div className="footer-col">
            <h3 className="footer-subtitle">Productos</h3>
            <ul className="footer-links">
              <li><Link to="/productos/mates">Mates</Link></li>
              <li><Link to="/productos/termos">Termos</Link></li>
              <li><Link to="/productos/bombillas">Bombillas</Link></li>
              <li><Link to="/productos">Ver todos</Link></li>
            </ul>
          </div>

          {/* Columna 3 - Información */}
          <div className="footer-col">
            <h3 className="footer-subtitle">Información</h3>
            <ul className="footer-links">
              <li><Link to="/nosotros">Sobre Nosotros</Link></li>
              <li><Link to="/envios">Envíos</Link></li>
              <li><Link to="/terminos">Términos</Link></li>
            </ul>
          </div>

          {/* Columna 4 - Contacto */}
          <div className="footer-col">
            <h3 className="footer-subtitle">Contacto</h3>
            <div className="footer-contact">
              <p>Av. Corrientes 1234, Buenos Aires</p>
              <p>+54 11 5678-9012</p>
              <p>info@lamatera.com</p>
            </div>
          </div>
        </div>

        <div className="footer-copyright">
          © {new Date().getFullYear()} La Matera - Todos los derechos reservados
        </div>
      </div>
    </footer>
  );
};

export default Footer;
