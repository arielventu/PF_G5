import React, { useState }  from "react";
import { firstWordBye } from '../utils';
import styles from './CardCart.module.css'
import rating from '../image/rating.png'
import Favorites from "./Favorites";
import { favorites, ShopCar } from "../actions/actions";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export default function CardCart({img, fullName, price,component,id}){
   const navegation = useNavigate()
    const dispatch = useDispatch() 
    const sampleLocation = useLocation();
    const [quantity, setQuantity] = useState(1)

    const counterCar = () => {
        const array = JSON.parse(localStorage.getItem('carrito'))
        const filtro = array.filter(item => item.id === id)
        // filtro[0]
        console.log(filtro)
    }

    const handleDecrement = () => {
        if(quantity !== 0) {
            setQuantity(prevCount => prevCount - 1)
        }
        counterCar()
    }

    const handleIncrement = (e) => {
        setQuantity(prevCount => prevCount + 1)
        console.log(e.target.id, quantity)
        counterCar()
    }
    console.log(id)
    var array = []
    const quitarCar =  (e) =>{
        e.preventDefault()
        const {value} = e.target

        console.log(sampleLocation.pathname.includes("/favorites"))
        if (sampleLocation.pathname.includes("/favorites")) {      
            if(localStorage.getItem('favoritos') != null){
                array = JSON.parse(localStorage.getItem('favoritos'))
            }
            const filterA = array.filter(item=>{ 
                if (item.id != value) {
                    return item
                }
            })
            localStorage.setItem('favoritos', JSON.stringify(filterA));
            dispatch(favorites( JSON.parse(localStorage.getItem('favoritos'))))
        }
        if (sampleLocation.pathname.includes("/shoppingCar")) {      
            if(localStorage.getItem('carrito') != null){
                array = JSON.parse(localStorage.getItem('carrito'))
            }
            const filterA = array.filter(item=>{ 
                if (item.id != value) {
                    return item
                }
            })
            localStorage.setItem('carrito', JSON.stringify(filterA));
            dispatch(ShopCar( JSON.parse(localStorage.getItem('carrito'))))
        }
        
    }
    const comprar = ()=>{
    }
    return(
        <div className={styles.containercart}>
            <img className={styles.img}src= {img} alt='img'></img>  
            <h2 className={styles.h2}>{firstWordBye(fullName)}</h2>
            <p className={styles.price}>${price}</p>
            <img className={styles.rating} src={rating} alt='rating'/>
            <div className={styles.icontainer}>
                <div className={styles.counter}>
                    <button onClick={handleDecrement} id={id} className={styles.bquantity}>-</button>
                    <div className={styles.quantity} id={id}>{quantity}</div>
                    <button onClick={handleIncrement} id={id} className={styles.bquantity}>+</button>
                </div>
                {
                    component === "favorites" || component === "carrito"?<button className={styles.bfav} value={id} onClick={(e)=>quitarCar(e)}>Quitar</button>:null
                }
            </div>
                                  
        </div>
    );
}