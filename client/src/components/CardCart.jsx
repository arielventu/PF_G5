import React, { useEffect, useState }  from "react";
import { firstWordBye } from '../utils';
import styles from './CardCart.module.css'
import rating from '../image/rating.png'
import Favorites from "./Favorites";
import { favorites, ShopCar } from "../actions/actions";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import avalible from "../image/no-disponible.jpg"
export default function CardCart({img, fullName, price,component,id,state,available}){
   const navegation = useNavigate()
    const dispatch = useDispatch() 
    const sampleLocation = useLocation();
    const [quantity, setQuantity] = useState(1)
    useEffect(() => {
        const array1 = JSON.parse(localStorage.getItem('carrito'))
        const prueba1 = array1.find(item => item.id === id)
        if (prueba1.cantidad === undefined) {
            prueba1.cantidad = 1
        }
        setQuantity(prevCount => prevCount = prueba1.cantidad)
    },[id])
    // useEffect(() => {
    //     const array = JSON.parse(localStorage.getItem('carrito'))
    //     console.log(array[0].cantidad)
    //     if (array[0].cantidad === undefined) {
    //      const prue = array.map((item)=>{
    //             item.cantidad=quantity
    //             return item
    //         })
    //         localStorage.setItem('carrito', JSON.stringify(prue))
    //         console.log(prue)
    //     }else{
    //         const array = JSON.parse(localStorage.getItem('carrito'))
    //     }
    // }, [array])
       
    const counterCar = (incre) => {
        const array = JSON.parse(localStorage.getItem('carrito'))
        const findd = array.find(item => item.id === id)
        if (incre) {
            findd.cantidad= quantity + 1
        }else{
            if (quantity !== 1) {
                findd.cantidad= quantity - 1
            } 
        }
        const filtro = array.filter(item => item.id !== id)
        filtro.push(findd)
        localStorage.setItem('carrito', JSON.stringify(filtro))
        console.log(filtro)
    }

    const handleDecrement = () => {
        console.log("dec",quantity)
        const incre = false
        if(quantity !== 1) {
            setQuantity(prevCount => prevCount - 1)
            state(prevCount => prevCount - 1)
        }
        counterCar(incre)
    }
    const handleIncrement = () => {
        console.log("inc",quantity)
        const incre = true
        setQuantity(prevCount => prevCount + 1)
        state(prevCount => prevCount + 1)
        counterCar(incre)
    }
    var array = []
    const quitarCar =  (e) =>{
        e.preventDefault()
        const {value} = e.target
        swal({
            title:"Are you sure?",
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
            } else {
              swal("Your item is safe!");
            }
          });
    }

    const comprar = ()=>{
    }
    
    return(
        <div className={styles.containercart}>
            {
               available?<img className={styles.img}src= {img} alt='img'></img>:<img className={styles.img}src= {avalible} alt='img'></img>  
            }
            {/* <img className={styles.img}src= {img} alt='img'></img>   */}
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
                    component === "carrito" ? <button className={styles.bfav} value={id} onClick={(e)=>quitarCar(e)}>Quitar</button>:null
                }
            </div>
                                  
        </div>
    );
}