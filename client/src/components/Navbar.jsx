import React from 'react'
import SearchBar from './SearchBar'
import cart from "../image/cart.png"
import BlueBird from "../image/BlueBird.svg"
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className={styles.container}>
        <ul className={styles.menu}>
            <div><img className={styles.logo} src={BlueBird}alt="logo Blue Bird"/></div>
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
            <div className={styles.SearchBar}><SearchBar/></div>
        </ul>
    </div>
  )
}

export default Navbar