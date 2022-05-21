import React from "react";
import styles from './Card.module.css'
import rating from '../image/rating.png'

export default function Card({img, fullName, price}){
    //console.log(Object.values(diets));
    return(
        <div className={styles.container}>
            <img className={styles.img}src= {img} alt='img'></img>  
            <h2 className={styles.h2}>{fullName}</h2>
            <p className={styles.price}>${price}</p>
            <img className={styles.rating} src={rating} alt='rating'/>                        
        </div>
    );
}