import React from 'react'
import SearchBar from './SearchBar'
import cart from "../image/cart.png"
import BlueBird from "../image/BlueBird.svg"
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import fav from "../image/favorito.png"

const Navbar = () => {
  return (
    <div className={styles.container}>
            <Link to="/" style={{outline: "none"}} >
              <div className={styles.divLogo} ><img className={styles.logo} src={BlueBird} alt="logo Blue Bird"/></div>
            </Link>
        <ul className={styles.menu}>
            <Link to="/">
              <button className={styles.button}><a href="#">Home</a></button>
            </Link>
            <Link to= "/Shop">
              <button className={styles.button}><a href="#">Shop</a></button>
            </Link>
            {/* <button className={styles.button}><a href="#">About Us</a></button>
            <button className={styles.button}><a href="#">Contact</a></button> */}
            <Link to="/register">
              <button className={styles.button}><a href="#">Register</a></button>
            </Link>
            <Link to= "/login">
            <button className={styles.button}><a href="#">Sign In</a></button>
            </Link>
            <Link to="/checkout" style={{outline: "none"}}>
                  <img className={styles.cart} src={cart} alt="shop cart" onClick={() => alert("This feature is in development")}/>
            </Link>
            <Link to="/favoritos" style={{outline: "none"}}>
              <img className={styles.fav} src={fav} alt='favoritos' onClick={() => alert("This feature is in development")}/>
            </Link>
        </ul>
        <div className={styles.divSearch} ><div className={styles.SearchBar}><SearchBar/></div></div>
    </div>
  )
}

export default Navbar