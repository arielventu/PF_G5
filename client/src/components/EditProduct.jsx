import React from "react";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {getDetail , getProducts} from '../actions/actions'

export default function EditProduct(){
    const {id} = useParams()
    const dispatch = useDispatch() 
    useEffect (() => {dispatch(getDetail(id))} ,[])
    useEffect(() => {
        dispatch(getProducts())
      }, [])
    const detailstate = useSelector((state) => state.shoes)
    console.log(detailstate)
    
    
const [input, setInput] = useState({
        /*  id: 6, */ 
            name: "",
            masterName: "",
            fullName: "",
            gender: "",
            detail: "",
            price: 10000,
            imagecover: "",
            imageurl: [
            
            ],
        })



    return(

        <h3>forxe</h3>

    )

}