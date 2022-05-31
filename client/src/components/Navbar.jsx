import React, { useState } from 'react'
import SearchBar from './SearchBar'
import cart from "../image/cart.png"
import BlueBird from "../image/BlueBird.svg"
import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import fav from "../image/favorito.png"
import swal from 'sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import Favorites from './Favorites';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {

  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();
  const [ droppedMenu, setDroppedMenu ] = useState(false);
  
  

  const favo = useSelector((state) => state.favorites)  
  const dispatch = useDispatch() 
  var valit = ""
  const navegation = useNavigate()
  var arrayCar = JSON.parse(localStorage.getItem('carrito'))
  var arrayFav = JSON.parse(localStorage.getItem('favoritos'))

  if (arrayCar === null ) {
    localStorage.setItem('carrito', JSON.stringify([]))
  }
  if (arrayFav === null ) {
    localStorage.setItem('favoritos', JSON.stringify([]))
  }
 
  const validation = (valit)=>{  
    if (valit ==="favorites") {
      if (localStorage.getItem('favoritos') === "[]") {
        return navegation(1)
      }else{
        navegation("/favorites")
      }      
    }
    if (valit ==="car") {
      console.log("first")
      if (localStorage.getItem('carrito') === "[]") {
        return navegation(1)
      }else{
        navegation("/shoppingCar")
      }    
    }  
  }

  const dropMenu = () => {
    if ( droppedMenu === false ) {
      setDroppedMenu(true);
    }
    else {
      setDroppedMenu(false);
    }
    console.log(droppedMenu)
  }

  const profileRedirect = () => {
    navegation("/user-profile")
  }
  
  console.log(user)

  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftContent}>
          <Link to="/" className={styles.divLogo}>
            <div>
              <img
                className={styles.logo}
                src={BlueBird}
                alt="logo Blue Bird"
              />
            </div>
          </Link>
          {isLoading ? (
            <button className={styles.loginButton}> Loading </button>
          ) : isAuthenticated ? (
            <button className={styles.loginButton} onClick={() => dropMenu()}>
              {" "}
              {user.name}{" "}
            </button>
          ) : (
            <button
              className={styles.loginButton}
              onClick={() => loginWithRedirect()}
            >
              {" "}
              Login{" "}
            </button>
          )}
        </div>
        <ul className={styles.menu}>
          <Link to="/">
            <button className={styles.button}>Home</button>
          </Link>
          <Link to="/Shop">
            <button className={styles.button}>Shop</button>
          </Link>
          <Link to="/products">
            <button className={styles.button}>Products</button>
          </Link>
          <Link to="/about">
            <button className={styles.button}>About Us</button>
          </Link>

          {/* {
          isAuthenticated ? 
          <button className={styles.button} onClick={() => logout()}> Log Out </button> :
          <button className={styles.button} onClick={() => loginWithRedirect()}> Log In </button>
        } */}

          <div className={styles.favCarBtns}>
            <div className={styles.favCarBtns}>
              <img
                className={styles.icon}
                src={cart}
                alt="shop cart"
                onClick={() => validation((valit = "car"))}
              />
              {arrayCar.length ? <span>{arrayCar.length}</span> : null}
            </div>
            <div className={styles.favCarBtns}>
              <img
                className={styles.icon}
                src={fav}
                alt="favorites"
                onClick={() => validation((valit = "favorites"))}
              />
              {arrayFav.length ? <span>{arrayFav.length}</span> : null}
            </div>
          </div>
        </ul>
        <div className={styles.divSearch}>
          <SearchBar />
        </div>
      </div>
      {droppedMenu && (
        <div className={styles.drpMenuStyles}>
          <button
            className={styles.customFont}
            onClick={() => {
              dropMenu();
              profileRedirect();
            }}
          >
            Mi Cuenta
          </button>
          <button
            className={styles.customFont}
            onClick={() => {
              dropMenu();
              logout();
            }}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
}

export default Navbar