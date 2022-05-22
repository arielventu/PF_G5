import React from "react";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/actions";
import { useEffect } from "react";
import styles from "./Detail.module.css"

export default function Detail(){
    const {id} = useParams()
    const dispatch = useDispatch() 
    useEffect (() => {dispatch(getDetail(id))} ,[]) // eslint-disable-line
    const detailstate = useSelector((state) => state.shoes)
    
    
      return(
        <div>
       { 
         detailstate.length > 0 ? 
         
         <div className = {styles.container}> 
             <h1 className = {styles.title}> {detailstate[0].fullName} </h1>
             <h5 className = {styles.price}> ${detailstate[0].price}</h5>
             <div className = {styles.innercontainer}>
             <h3 className = {styles.info}>category: {detailstate[0].category}</h3>
             <h3 className = {styles.info}>Score: {detailstate[0].score}</h3>
             </div>
             <h3 className = {styles.subtitles}>Colors:</h3>
             <img src={detailstate[0].images} alt = 'Shoe Image' className = {styles.img}/>
             <h3 className = {styles.subtitles}>Sizes: {detailstate[0].score}</h3>
             <Link to='/home'><button className = {styles.button}>Back to Home </button> </Link>
         </div> : 
         
         <div> <h2> loading... </h2> </div>
        }
       </div>
           )
       
       }   