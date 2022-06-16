import React, { useEffect }from "react";
import { firstWordBye } from '../utils';
import styles from './Card.module.css'
import axios from "axios"
// import rating from '../image/rating.png'
import Favorites from "./Favorites";
import { favorites, ShopCar, getReviewsById } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import starB from "../image/starb.svg";
import starY from "../image/stary.svg";
import swal from "sweetalert";

export default function Card({img, fullName, price,component,id , stock}){
    // console.log(stock)
    const navegation = useNavigate()
    const dispatch = useDispatch() 
    const sampleLocation = useLocation();
    var array = []
    const  quitar  = (e) =>{
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
            // swal("The item was deleted", {
            //   icon: "success",
            // });
            swal({
              text: "The item was deleted",
              icon: "success",
              buttons: false,
              timer: 1300,
            });
            if (sampleLocation.pathname.includes("/favorites"))  {      
              if(localStorage.getItem('favoritos') != null){
                  array = JSON.parse(localStorage.getItem('favoritos'))
              }
              const filterA = array.filter(item=>{ 
                  if (item.id != value) {
                      return item
                  }
              })
              if(localStorage.getItem('authenticated') === "true")  axios.delete(`http://localhost:3001/favorites/${value}`)
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
                if(localStorage.getItem('authenticated') === "true")  axios.delete(`http://localhost:3001/basketList/${value}`)
                localStorage.setItem('carrito', JSON.stringify(filterAr));
                dispatch(ShopCar( JSON.parse(localStorage.getItem('carrito'))))
            }
            } else {
              swal("Your item is safe!");
            }
        });
    }
 
    const addToCart = ()=>{

    }
    
    // console.log(stock)
    // Reviews -----------------------------------
    useEffect(() => {
        dispatch(getReviewsById(id))
    }, [])
    const reviewsById = useSelector((state) => state.reviewsById);
    const starsLevels = [];
    reviewsById.map((e) => {starsLevels.push(e.starsLevel)})
    let starsAvg = Math.ceil(starsLevels.reduce((a, b) => a + b, 0) / starsLevels.length)

    return(
        <div className={styles.container}>
            <img className={styles.img}src= {img} alt='img'></img>  
            <h2 className={styles.h2}>{firstWordBye(fullName)}</h2>
            <p className={styles.price}>${new Intl.NumberFormat("en-EN").format(price)}</p>
            <p >{stock}</p>
            {/* <img className={styles.rating} src={rating} alt='rating'/>  */}
            <div className = {styles.starsContainer}>
            {starsAvg === 1 &&
            <div className={styles.divStarsAvg}>
              <p className={styles.pStars}>{starsAvg}/5</p>
                <img className={styles.starAvg} src={starY} alt="star" />
                <img className={styles.starAvg} src={starB} alt="star" />
                <img className={styles.starAvg} src={starB} alt="star" />
                <img className={styles.starAvg} src={starB} alt="star" />
                <img className={styles.starAvg} src={starB} alt="star" />
              </div>}
            {starsAvg === 2 &&
              <div className={styles.divStarsAvg}>
                <p className={styles.pStars}>{starsAvg}/5</p>
                <img className={styles.starAvg} src={starY} alt="star" />
                <img className={styles.starAvg} src={starY} alt="star" />
                <img className={styles.starAvg} src={starB} alt="star" />
                <img className={styles.starAvg} src={starB} alt="star" />
                <img className={styles.starAvg} src={starB} alt="star" />
              </div>}
            {starsAvg === 3 &&
              <div className={styles.divStarsAvg}>
                <p className={styles.pStars}>{starsAvg}/5</p>
                <img className={styles.starAvg} src={starY} alt="star" />
                <img className={styles.starAvg} src={starY} alt="star" />
                <img className={styles.starAvg} src={starY} alt="star" />
                <img className={styles.starAvg} src={starB} alt="star" />
                <img className={styles.starAvg} src={starB} alt="star" />
              </div>}
            {starsAvg === 4 && 
              <div className={styles.divStarsContainer}>
                <p className={styles.pStars}>{starsAvg}/5</p>
                <div className={styles.divStarsAvg}>
                  <img className={styles.starAvg} src={starY} alt="star" />
                  <img className={styles.starAvg} src={starY} alt="star" />
                  <img className={styles.starAvg} src={starY} alt="star" />
                  <img className={styles.starAvg} src={starY} alt="star" />
                  <img className={styles.starAvg} src={starB} alt="star" />
                </div>
              </div>}
            {starsAvg === 5 &&
              <div className={styles.divStarsAvg}>
                <p className={styles.pStars}>{starsAvg}/5</p>
                <img className={styles.starAvg} src={starY} alt="star" />
                <img className={styles.starAvg} src={starY} alt="star" />
                <img className={styles.starAvg} src={starY} alt="star" />
                <img className={styles.starAvg} src={starY} alt="star" />
                <img className={styles.starAvg} src={starY} alt="star" />
              </div>}
              </div>
            {
                component === "favorites"?<button className={styles.bfav} value={id} onClick={(e)=>addToCart(e,"addToCart")}>Add to cart</button>:null
            } 
            {
                component === "favorites" || component === "carrito"?<button className={styles.bfav} value={id} onClick={(e)=>quitar(e)}>Delete</button>:null
            }                    
        </div>
    );
}