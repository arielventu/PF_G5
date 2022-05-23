import React from 'react'
import SearchBar from './SearchBar'
import cart from "../image/cart.png"
import BlueBird from "../image/BlueBird.svg"
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className={styles.container}>
            <div className={styles.divLogo} ><img className={styles.logo} src={BlueBird} alt="logo Blue Bird"/></div>
        <ul className={styles.menu}>
            <Link to="/">
              <li className={styles.button}><a href="#">Home</a></li>
            </Link>
            <Link to= "/Shop">
              <li className={styles.button}><a href="#">Shop</a></li>
            </Link>
            <li className={styles.button}><a href="#">About Us</a></li>
            <li className={styles.button}><a href="#">Contact</a></li>
            <li className={styles.button}><a href="#">Register</a></li>
            <li className={styles.button}><a href="#">Sign In</a></li>
            <div className={styles.cart}><a href="#"><img className={styles.carrito} src={cart}alt="carrito de compras"/></a></div>
        </ul>
            <div className={styles.SearchBar}><SearchBar/></div>
    </div>
  )
}

export default Navbar