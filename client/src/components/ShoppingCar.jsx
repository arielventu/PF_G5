import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {  getProducts, ShopCar } from '../actions/actions'
import Card from './Card'

const ShoppingCar = () => {
  const navegation = useNavigate()
  var array = []
  var array2 = []
  const dispatch = useDispatch()
  const favorite = useSelector(state => state.favorites)
  const products = useSelector(state => state.shoes)


  if(products.length === 0){
    dispatch(getProducts())
  }
  useEffect(() => {
    dispatch(ShopCar(array))
  }, [])
  if(localStorage.getItem('carrito') != null){
    array = JSON.parse(localStorage.getItem('carrito'))
    const sum = array.map(item =>{return item.price})
    
    var sumW = sum.reduce(
      (previousValue, currentValue) => previousValue + currentValue, 0);
    console.log(sumW)
    
    
  }
  if (localStorage.getItem('carrito') === null) {
    return navegation("/shop")
  }
  
 
   if(localStorage.getItem('carrito') != null){
    return (
      <div>
        <h1 style={{textAlign:"center"}}>ShoppingCar</h1>
        {
          !(array[0] === undefined)? array.map(item=> <Card key={item.id} id={item.id} fullName={item.masterName} price={item.price} img={item.imagecover} component={"carrito"}/>):
          navegation("/shop")     
        }
      <div >
      <h3 style={{textAlign:"end",verticalAlign:"top"}}>Precio total: {sumW}</h3>
      </div>
      </div>
    )
      }else{
        return (
          <div>
            <h1>NO HAY NADA</h1>
          </div>
        )
      }
}

export default ShoppingCar