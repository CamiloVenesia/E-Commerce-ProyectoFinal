import { Link } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';
import './Navbar.css';

function Navbar() {
    return (
        <header className='header-nav'>
            <nav className="nav-bar">
                <img src="src\assets\LogoLaMatera.png" alt="Logo de empresa" className='nav-img'/>
                <ul className="nav-bar-options">
                    <li className="nav-bar-item">
                        <Link className='nav-link' to="/">
                            INICIO
                        </Link>
                    </li>
                    <li className="nav-bar-item">
                        <Link className='nav-link' to="/categoria/mates">
                            MATES
                        </Link>
                    </li>
                    <li className="nav-bar-item">
                        <Link className='nav-link' to="/categoria/termos">
                            TERMOS
                        </Link>
                    </li>
                    <li className="nav-bar-item">
                        <Link className='nav-link' to="/categoria/accesorios">
                            ACCESORIOS
                        </Link>
                    </li>
                </ul>
                <CartWidget />
            </nav>
        </header>
    );
};

export default Navbar;