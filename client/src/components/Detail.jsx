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
      var findAdd = detailstate.find(item => item.id == value )
      arrayAdd.push(findAdd)
    }else{
      arrayAdd = JSON.parse(localStorage.getItem('carrito'))
      console.log("first",typeof value)
      const idMap = arrayAdd.find(item=>  item.id == value)
      if (idMap === undefined) {
        console.log(detailstate)
        const find = detailstate.find(item => item.id == value )
        arrayAdd.push(find)
      }
    }
    localStorage.setItem('carrito', JSON.stringify(arrayAdd))
    dispatch(favorites( JSON.parse(localStorage.getItem('carrito'))))
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
    dispatch(favorites( JSON.parse(localStorage.getItem('favoritos'))))
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
            <h3 className={styles.subtitles}>Sizes: {detailstate2.stocks.size}</h3>
            {/* <select>
             {
             detailstate2.sizesSortOrder.map(item => <option value={item}>{item}</option>)
             }
            </select> */}
            </div>
            <h3 className={styles.colors}>colors:{detailstate2.colors}</h3>
            <div className = {styles.innercontainer2}>
                <h5 className = {styles.price}> ${detailstate2.price}</h5>
                <img className={styles.rating} src={rating} alt='rating'/> 
            </div>
            <div className = {styles.innercontainer3}>
                <button className={styles.add} onClick={(e)=>add(e)} value={id}>Add to Cart</button>
                <img className={styles.fav} onClick={(e)=>favorite(e)} accessKey={id} src={fav} alt='favoritos'/> 
            </div>
            <div className={styles.backToHome}>
            <Link to='/shop'>
              <button className = {styles.button}>Back to shop</button> 
            </Link>
          </div>
      </div> : 
      <div><h2> loading... </h2></div>
    }
    </div>
        )
    
    }   