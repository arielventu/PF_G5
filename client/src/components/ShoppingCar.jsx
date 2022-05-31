import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {  getProducts, ShopCar } from '../actions/actions'
import CardCart from './CardCart'
import styles from './ShoppingCar.module.css'

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
      <div className={styles.containercart}>
        <h1 style={{textAlign:"center"}}>Shopping Cart</h1>
        <div className={styles.icontainercart}>
        {
          !(array[0] === undefined)? array.map(item=> <CardCart key={item.id} id={item.id} fullName={item.masterName} price={item.price} img={item.imagecover} component={"carrito"}/>):
          navegation("/shop")     
        }
        </div>
      <div >
      <h3 className={styles.pricecart}>Precio total: {sumW}</h3>
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