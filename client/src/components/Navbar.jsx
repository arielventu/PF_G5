import React from 'react'
import SearchBar from './SearchBar'
import cart from "../image/cart.png"
import BlueBird from "../image/BlueBird.svg"
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import fav from "../image/favorito.png"
import swal from 'sweetalert';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {


  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();
  
  
  console.log(user)

  return (
    <div className={styles.container}>
      <Link to="/" style={{ outline: "none" }} >
        <div className={styles.divLogo} ><img className={styles.logo} src={BlueBird} alt="logo Blue Bird" /></div>
      </Link>
      <ul className={styles.menu}>
        <Link to="/">
          <button className={styles.button}>Home</button>
        </Link>
        <Link to="/Shop">
          <button className={styles.button}>Shop</button>
        </Link>
        {/* <button className={styles.button} onClick={() => {
          swal({
            title: "¿Estás seguro?",
            text: "¿Deseas salir de la aplicación?",
            icon: "success",
            // buttons: true,
            // dangerMode: true,
          })
        }}><a href="#">About Us</a></button> */}
            {/* <button className={styles.button}><a href="#">Contact</a></button>  */}
            
            {/* 
            ----------------  IVO ------------------------
            <Link to="/register">
              <button className={styles.button}>Register</button>
            </Link> 
            <Link to= "/login">
            <button className={styles.button}>Sign In</button>
            </Link> 

            ----------------  IVO ------------------------ 
            */}
            
            

            <button className={styles.button} onClick={() => loginWithRedirect()}> Log In </button>
            <button className={styles.button} onClick={() => logout()}> Log Out </button>
            
            <Link to="/shoppingCar" style={{outline: "none"}}>
                  <img className={styles.cart} src={cart} alt="shop cart"/>
            </Link>
            <Link to="/favorites" style={{outline: "none"}}>
              <img className={styles.fav} src={fav} alt='favorites'/>
            </Link>
        </ul>
        <div className={styles.divSearch} ><div className={styles.SearchBar}><SearchBar/></div></div>
    </div>
  )
}

export default Navbar