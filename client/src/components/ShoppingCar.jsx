import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import {  getProducts, ShopCar } from '../actions/actions'
import Card from './Card'
import Cardcart from './CardCart'

import styles from './ShoppingCar.module.css'

const ShoppingCar = () => {
  const navegation = useNavigate()
  var array = []
  const dispatch = useDispatch()
  const car = useSelector(state => state.shoppingCar)
  const products = useSelector(state => state.shoes)
  const [valor, setValor] = useState(1)

  if(products.length === 0){
    dispatch(getProducts())
  }
  if(localStorage.getItem('carrito') != null){
    array = JSON.parse(localStorage.getItem('carrito'))
    array.map(item =>{if(item.cantidad === undefined)item.cantidad = 1})
    const sum = array.map(item =>{return (item.price*item.cantidad)})
    var sumW = sum.reduce((previousValue, currentValue) => previousValue + currentValue, 0); 
    console.log("11",sum)     
  }
  console.log(valor)
  if (localStorage.getItem('carrito') === null) {
    return navegation("/shop")
  }
  
 array && array.sort((a, b) => {
  if (a.id > b.id) return 1
  if (a.id < b.id) return -1
  return 0
  })
  console.log(array)
   if(localStorage.getItem('carrito') != null || !(Object.values(localStorage.getItem('carrito')).length === 0)){
    return (
      <div className={styles.containercart}>
        <h1 className={styles.titulofav}>Shopping Cart</h1>
        <div className={styles.icontainercart}>
        {
          !(array[0] === undefined)? array.map(item=> <Cardcart selecSize={item.selecSize} available={item.available} state={setValor} key={item.id} id={item.id} fullName={item.masterName} price={item.price} img={item.imagecover} component={"carrito"}/>):
          navegation("/shop")     
        }
        </div>
        <div >
          <h3 className={styles.pricecart}>Total: ${new Intl.NumberFormat("en-EN").format(sumW)}</h3>
        </div>
        <div className={styles.divButtoncart}>
          <Link to="/checkout">
            <button className={styles.buttoncart}>Proceed to Checkout</button>
          </Link>
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