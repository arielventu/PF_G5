import React from 'react'
import SearchBar from './SearchBar'
import cart from "../image/cart.png"
import BlueBird from "../image/BlueBird.svg"
import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import fav from "../image/favorito.png"
import swal from 'sweetalert';

const Navbar = () => {
  var array = []
  var valit = ""
  const navegation = useNavigate()
  const validation = (valit)=>{
    if (valit ==="favorites") {
      if (localStorage.getItem('favoritos') == null) {
        return navegation(1)
      }
      array = localStorage.getItem('favoritos').split(",")
      console.log(array)
      const pru = array.map(item=>{
        if (item === "") {
          localStorage.removeItem('favoritos');
          return alert("LLena tus favoritos")
        }
      })
      console.log(pru)
      navegation("/favorites")
    }
    
  }

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
            {/* <button className={styles.button}><a href="#">Contact</a></button>  */}
            <Link to="/register">
              <button className={styles.button}>Register</button>
            </Link>
            <Link to= "/login">
            <button className={styles.button}>Sign In</button>
            </Link>
            <Link to="/shoppingCar" style={{outline: "none"}}>
                  <img className={styles.cart} src={cart} alt="shop cart"/>
            </Link>
            
              <img className={styles.fav} src={fav} alt='favorites' onClick={()=>validation(valit="favorites")}/>
            
        </ul>
        <div className={styles.divSearch} ><div className={styles.SearchBar}><SearchBar/></div></div>
    </div>
  )
}

export default Navbar