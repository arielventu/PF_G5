import React from "react";
import { firstWordBye } from '../utils';
import styles from './Card.module.css'
import rating from '../image/rating.png'
import Favorites from "./Favorites";

export default function Card({img, fullName, price, component, id}){
    var array = []
    const quitar = (e) =>{
        e.preventDefault()
        const {value} = e.target
        if(localStorage.getItem('favoritos') != null){
            array = localStorage.getItem('favoritos').split(",")
          }
        const arrayfil = array.filter(item=> item !== value )  
        console.log(value)
        console.log(arrayfil)
        localStorage.removeItem('favoritos');
        localStorage.setItem('favoritos', `${arrayfil}`)
        //array = localStorage.getItem('carrito').split(",")
        
    }
    return(
        <div className={styles.container}>
            <img className={styles.img}src= {img} alt='img'></img>  
            <h2 className={styles.h2}>{firstWordBye(fullName)}</h2>
            <p className={styles.price}>${price}</p>
            <img className={styles.rating} src={rating} alt='rating'/> 
            {
                component === "favorites"?<button value={id} onClick={(e)=>quitar(e)}>Comprar</button>:null
            } 
            {
                component === "favorites" || component === "carrito"?<button value={id} onClick={(e)=>quitar(e)}>Quitar</button>:null
            }
                                  
        </div>
    );
}