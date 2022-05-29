import React from "react";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { favorites, getDetail, getProducts } from "../actions/actions";
import { useEffect } from "react";
import styles from "./Detail.module.css"
import rating from '../image/rating.png'
import fav from '../image/favorito.png'

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
    console.log(lala)
    console.log(sizes)

  useEffect(() => {
    dispatch(getProducts())
  }, [])
  
  if(detailstate.length != 0){
    detailstate2 = detailstate.find(item => item.id == id )
  }
  const add = (e)=>{
    var arrayAdd = []
    const {value} = e.target
    if (localStorage.getItem('carrito') === null) {
      arrayAdd.push(value)
    }else{
      arrayAdd = localStorage.getItem('carrito').split(",")
      if (!arrayAdd.includes(value)) {
        arrayAdd.push(value)
      }
    }
    localStorage.setItem('carrito', `${arrayAdd}`)
  }

  const favorite = (e)=>{
    var array = []
    const {accessKey} = e.target
    console.log(accessKey)
    if (localStorage.getItem('favoritos') === null) {
      array.push(accessKey)
    }else{
      array = localStorage.getItem('favoritos').split(",")
      if (!array.includes(accessKey)) {
        array.push(accessKey)
      }
    }
    const local = localStorage.setItem('favoritos', `${array}`)
    dispatch(favorites(array))
  }

  
  return(
    <div>
    { 
      detailstate.length > 0 ? 
      <div className = {styles.container}>
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
                <h5 className = {styles.price}> ${detailstate2.price}</h5>
                <img className={styles.rating} src={rating} alt='rating'/> 
            </div>
            <div className = {styles.innercontainer3}>
                <button className={styles.add} onClick={(e)=>add(e)} value={id}>Add to Cart</button>
                <img className={styles.fav} onClick={(e)=>favorite(e)} accessKey={id} src={fav} alt='favoritos'/> 
            </div>
      </div> : 
      <div><h2> loading... </h2></div>
    }
    </div>
        )
    
    }   