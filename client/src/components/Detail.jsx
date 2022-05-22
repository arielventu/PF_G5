import React from "react";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDetail, getProducts } from "../actions/actions";
import { useEffect } from "react";
import styles from "./Detail.module.css"

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
    
    console.log(detailstate2.sizesSortOrder);
  }

  
  return(
    <div>
    { 
      detailstate.length > 0 ? 
      
      <div className = {styles.container}> 
          <h1 className = {styles.title}> {detailstate2.fullName} </h1>
          <h5 className = {styles.price}> ${detailstate2.price}</h5>
          <div className = {styles.innercontainer}>
          <h3 style={{backgroundColor:"#FFFFFA"}}>colors: {detailstate2.colors}</h3>
          <h3 className = {styles.info}>Score: {detailstate2.score}</h3>
          </div>
          <h3 className = {styles.subtitles}>Colors:</h3>
          <img src={detailstate2.images[0].src} alt = 'Shoe Image' className = {styles.img}/>
          <h3 className = {styles.subtitles}>Sizes: {detailstate2.sizes.value}</h3>
          <select>
            {
              detailstate2.sizesSortOrder.map(item => <option value={item}>{item}</option>)
            }
          </select>
          <h3 className = {styles.subtitles}>Description: {detailstate2.description}</h3>
          <Link to='/home'><button className = {styles.button}>Back to Home </button> </Link>
      </div> : 
      
      <div> <h2> loading... </h2> </div>
    }
    </div>
        )
    
    }   