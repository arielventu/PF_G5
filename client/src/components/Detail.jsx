import React, { useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { favorites, getDetail, getProducts, ShopCar, getReviewsById} from "../actions/actions";
import { useEffect } from "react";
import Reviews from "./Reviews";
import NewReview from "./NewReview";
import styles from "./Detail.module.css"
import starB from "../image/starb.svg";
import starY from "../image/stary.svg";
import rating from '../image/rating.png'
import fav from '../image/favorito.png'
import {Modal} from "reactstrap";

var detailstate2 = []
var size = []

export default function Detail(){

  const {id} = useParams()
  const dispatch = useDispatch() 
  useEffect (() => {dispatch(getDetail(id))} ,[]) // eslint-disable-line
  const detailstate = useSelector((state) => state.shoes)
  const products = useSelector(state => state.shoes)
  const auxProducts = useSelector(state => state.auxShoes)

  let sizes = []
  let lala = products.map((e) => {
    e.stocks.map((e) => {
        sizes = e.size.size
    })
    return sizes
  })
    lala= [... new Set(lala)].sort()
 
  useEffect(() => {
    dispatch(getProducts())
  }, [])
  
  if(detailstate.length != 0){
    detailstate2 = detailstate.find(item => item.id == id )
  }
  
  const add = async (e)=>{
    var arrayAdd = []
    const {value} = e.target
    if (localStorage.getItem('carrito') === null) {
      var findAdd = detailstate.find(item => item.id == value )
      arrayAdd.push(findAdd)
    }else{
      arrayAdd = await JSON.parse(localStorage.getItem('carrito'))
      console.log("first",typeof value)
      const idMap = arrayAdd.find(item=>  item.id == value)
      if (idMap === undefined) {
        console.log(detailstate)
        const find = detailstate.find(item => item.id == value )
        arrayAdd.push(find)
      }
    }
    localStorage.setItem('carrito', JSON.stringify(arrayAdd))
    dispatch(ShopCar( ))
  }

  const favorite = async (e)=>{
    var array = []
    const {accessKey} = e.target
    if (localStorage.getItem('favoritos') === null) {
      var findKey = detailstate.find(item => item.id == accessKey )
      array.push(findKey)
    }else{
      array = await JSON.parse(localStorage.getItem('favoritos'))
      console.log("first",typeof accessKey)
      const idMap = array.find(item=>  item.id == accessKey)
      if (idMap === undefined) {
        console.log(detailstate)
        const find = detailstate.find(item => item.id == accessKey )
        array.push(find)
      }
    }
    localStorage.setItem('favoritos', JSON.stringify(array))
    dispatch(favorites())
  }


  // Reviews -----------------------------------
  const reviewsById = useSelector((state) => state.reviewsById);
  const [showModal, setShowModal] = useState(false);

  const handleModal = (e) => {
    setShowModal(!showModal);
  }
  const starsLevels = [];
  reviewsById.map((e) => {starsLevels.push(e.starsLevel)})
  let starsAvg = Math.ceil(starsLevels.reduce((a, b) => a + b, 0) / starsLevels.length)

  console.log(starsAvg);
  return(
    <div className={styles.details}>
    { detailstate.length > 0 ? 
      <div className = {styles.containerp}>
          <h1 className = {styles.title}> {detailstate2.fullName} </h1>
          <img src={detailstate2.imagecover} alt = 'Shoe Image' className = {styles.img}/>
          <p className={styles.description}>{detailstate2.detail}</p>
          <div className = {styles.innercontainer}>
            <h3 className={styles.subtitles}>Sizes:</h3>
            <select>
             {
             lala.map(item => <option value={item}>{item}</option>)
             }
            </select>
          </div>
            <h3 className={styles.subtitles}>colors:</h3>
            <div className={styles.containercolors}>
              <div className={styles.color1} style={{ backgroundColor: `${detailstate2.colors[0]}` }}></div>
              <div className={styles.color2} style={{ backgroundColor: `${detailstate2.colors[1]}` }}></div>
            </div>
            <div className = {styles.innercontainer2}>
              <h5 className={styles.price}> ${detailstate2.price}</h5>
            {/* <img className={styles.rating} src={rating} alt='rating'/>  */}
            {starsAvg === 1 &&
              <div className={styles.divStarsAvg}>
                <img className={styles.starAvg} src={starY} alt="star" />
                <img className={styles.starAvg} src={starB} alt="star" />
                <img className={styles.starAvg} src={starB} alt="star" />
                <img className={styles.starAvg} src={starB} alt="star" />
                <img className={styles.starAvg} src={starB} alt="star" />
              </div>}
            {starsAvg === 2 &&
              <div className={styles.divStarsAvg}>
                <img className={styles.starAvg} src={starY} alt="star" />
                <img className={styles.starAvg} src={starY} alt="star" />
                <img className={styles.starAvg} src={starB} alt="star" />
                <img className={styles.starAvg} src={starB} alt="star" />
                <img className={styles.starAvg} src={starB} alt="star" />
              </div>}
            {starsAvg === 3 &&
              <div className={styles.divStarsAvg}>
                <p>{starsAvg}</p>
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
                <img className={styles.starAvg} src={starY} alt="star" />
                <img className={styles.starAvg} src={starY} alt="star" />
                <img className={styles.starAvg} src={starY} alt="star" />
                <img className={styles.starAvg} src={starY} alt="star" />
                <img className={styles.starAvg} src={starY} alt="star" />
              </div>}
              </div>

            <div className = {styles.innercontainer3}>
                <button className={styles.add} onClick={(e)=>add(e)} value={id}>Add to Cart</button>
                <img className={styles.fav} onClick={(e)=>favorite(e)} accessKey={id} src={fav} alt='favoritos'/> 
            </div>
            <button onClick={handleModal} className={styles.buttonAddReview}>Add review</button>
            <Modal isOpen={showModal} className={styles.containerModal}>
              <div className={styles.divModal}>
                <button onClick={handleModal} className={styles.buttonCloseModal}>x</button>
                <NewReview handleModal={ handleModal }/>
              </div>
            </Modal>
            <Reviews productId={ id } name={ detailstate2.fullName }/>
      </div> : 
      <div><h2> loading... </h2></div>
    }
    </div>
        )
    
    }   