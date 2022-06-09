import React from "react";
import { firstWordBye } from '../utils';
import styles from './Card.module.css'
import rating from '../image/rating.png'
import Favorites from "./Favorites";
import { favorites, ShopCar } from "../actions/actions";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function Card({img, fullName, price,component,id , stock}){
    console.log(stock)
    const navegation = useNavigate()
    const dispatch = useDispatch() 
    const sampleLocation = useLocation();
    var array = []
    const quitar = (e) =>{
        e.preventDefault()
        const {value} = e.target
        //console.log(sampleLocation.pathname.includes("/favorites"))
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will have to search again for this item!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("The item was deleted", {
                icon: "success",
              });
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
                const filterAr = array.filter(item=>{ 
                    if (item.id != value) {
                        return item
                    }
                })
                localStorage.setItem('carrito', JSON.stringify(filterAr));
                dispatch(ShopCar( JSON.parse(localStorage.getItem('carrito'))))
            }
            } else {
              swal("Your item is safe!");
            }
          });
    }
 
    const comprar = ()=>{

    }
    
    console.log(stock)
    return(
        <div className={styles.container}>
            <img className={styles.img}src= {img} alt='img'></img>  
            <h2 className={styles.h2}>{firstWordBye(fullName)}</h2>
            <p className={styles.price}>${price}</p>
            <p >{stock}</p>
            <img className={styles.rating} src={rating} alt='rating'/> 
            {
                component === "favorites"?<button className={styles.bfav} value={id} onClick={(e)=>comprar(e)}>Comprar</button>:null
            } 
            {
                component === "favorites" || component === "carrito"?<button className={styles.bfav} value={id} onClick={(e)=>quitar(e)}>Quitar</button>:null
            }                    
        </div>
    );
}