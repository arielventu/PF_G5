import React from 'react'
import SearchBar from './SearchBar'
import carrito from "../image/carrito2.png"
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.container}>
        <div className={styles.button}>
            <h4 style={{marginLeft:"20px"}}>Home</h4>
            <h4 style={{marginLeft:"20px"}}>Shop</h4>
            <h4 style={{marginLeft:"20px"}}>About Us</h4>
            <h4 style={{marginLeft:"20px"}}>Contact</h4>
            <img className={styles.carrito} src={carrito}alt="carrito de compras"/>
            <SearchBar />
        </div>
    </div>
  )
}

export default Navbar