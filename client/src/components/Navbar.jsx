import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import cart from "../image/cart.png"
import BlueBird from "../image/BlueBird.svg"
import userQuest from "../image/userQuest.png"
import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import fav from "../image/favorito.png"
import swal from 'sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import Favorites from './Favorites';
import { useAuth0 } from '@auth0/auth0-react';
import { getUserRoles, getApiJWT } from "../actions/actions"
if (localStorage.getItem('carrito') === null ) {
  localStorage.setItem('carrito', JSON.stringify([]))
}
if (localStorage.getItem('favoritos') === null ) {
  localStorage.setItem('favoritos', JSON.stringify([]))
}
const Navbar = () => {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [ droppedMenu, setDroppedMenu ] = useState(false);
  const [ admin, setAdmin ] = useState(false);
  const favo = useSelector((state) => state.favorites)  
  const car = useSelector((state) => state.shoppingCar)  
  const dispatch = useDispatch() 
  const navegation = useNavigate()
  var valit = ""
  var arrayCar = JSON.parse(localStorage.getItem('carrito'))
  var arrayFav = JSON.parse(localStorage.getItem('favoritos'))


  const getToken = () => {
    return new Promise( (resolve, reject) => {
      getAccessTokenSilently()
        .then( async token => getApiJWT(token) )
        .then( apiToken => {
          resolve(apiToken);
          console.log(apiToken)
        })
        .catch( error => {
          reject(error)
        })
    })
  };
 
  const validation = (valit)=>{  
    if (valit ==="favorites") {
      console.log("favorito")
      if (localStorage.getItem('favoritos') === "[]") {
        return navegation(1)
      }else{
        navegation("/favorites")
      }      
    }
    if (valit ==="car") {
      if (localStorage.getItem('carrito') === "[]") {
        return navegation(1)
      }else{
        navegation("/shoppingCar")
      }    
    }  
  }

  const dropMenu = () => {
    if ( droppedMenu === false ) {
      getToken()
        .then( apiToken => getUserRoles(user.sub, apiToken) )
        .then( data => {
          console.log(data)
          if (data.length === 0) {
            setAdmin(false)
          }
          else {
            for ( let x=0; x < data.length; x++ ) {
              if ( data[x].name === 'Admin' ) {
                setAdmin(true);
                break
              }
              else {
                setAdmin(false)
              }
            }
          }
          setDroppedMenu(true);
        })
        .catch( err => console.log(err) )
    }
    else {
      setDroppedMenu(false);
    }
  }

  const profileRedirect = () => {
    navegation("/user-profile")
  }

  const administrationRedirect = () => {
    navegation("/administration")
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
            <button className={styles.buttonNavBar}>Home</button>
          </Link>
          <Link to="/Shop">
            <button className={styles.buttonNavBar}>Shop</button>
          </Link>
          <Link to="/products">
            <button className={styles.buttonNavBar}>Products</button>
          </Link>
          {/* <Link to="/about">
            <button className={styles.buttonNavBar}>About Us</button>
          </Link> */}

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
                alt="shoppingCar"
                onClick={() => validation((valit = "car"))}
              />
              {arrayCar.length ? <span className={styles.iconsCartFav}>{arrayCar.length}</span> : null}
            </div>
            <div className={styles.favCarBtns}>
              <img
                className={styles.icon}
                src={fav}
                alt="favorites"
                onClick={() => validation((valit = "favorites"))}
              />
              {arrayFav.length ? <span className={styles.iconsCartFav}>{arrayFav.length}</span> : null}
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
            My Account
          </button>
          { admin && (
            <button
              className={styles.customFont}
              onClick={() => {
                dropMenu();
                administrationRedirect();
              }}
            >
              Administration
            </button>
          )}
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