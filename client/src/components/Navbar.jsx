import React from 'react'
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

  
  console.log(isAuthenticated)

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
        <button className={styles.button} onClick={() => {
          swal({
            title: "¿Estás seguro?",
            text: "¿Deseas salir de la aplicación?",
            icon: "success",
            // buttons: true,
            // dangerMode: true,
          })
        }}><a href="#">About Us</a></button>
                      
            <button className={styles.button} onClick={() => loginWithRedirect()}> Log In </button>
            <button className={styles.button} onClick={() => logout()}> Log Out </button>
            
            <img className={styles.cart} src={cart} alt="shop cart" onClick={()=>validation(valit="car")}/>
            <span style={{position:"absolute",marginLeft:"400px",}}>{arrayCar.length}</span>
            <img className={styles.fav} src={fav} alt='favorites' onClick={()=>validation(valit="favorites")}/> 
            <span style={{position:"absolute",marginLeft:"525px"}}>{arrayFav}</span>
        </ul>
        <div className={styles.divSearch} ><div className={styles.SearchBar}><SearchBar/></div></div>
    </div>
  )
}

export default Navbar