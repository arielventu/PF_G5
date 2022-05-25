import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/actions'
import Card from './Card'
import Construction from './Construction'
var array = []
var array2 = []
const Favorites = () => {
  var array = []
  var array2 = []
  const dispatch = useDispatch()
  const favorite = useSelector(state => state.favorites)
  const products = useSelector(state => state.shoes)
  console.log(favorite)

  // useEffect(() => {
  //   console.log("first")
  //     dispatch(getProducts()) 
  // }, [])
  if(products.length === 0){
    dispatch(getProducts())
  }
  array = localStorage.getItem('favoritos').split(",")
  const cont = array.length
   
  for (let i = 0; i < cont; i++) {
    array2.push(products?.find(item=>item.id.toString() === array[i]))
  }
  
  
  return (
    <div>
      {
        !(array2[0] === undefined)? array2.map(item=> <Card key={item.id} id={item.id} fullName={item.masterName} price={item.price} img={item.imagecover}/>):
       <img style={{display:"block",margin:"auto"}} src="https://pa1.narvii.com/6607/6da40c914c7145c591c0777ada8a9a177bb4f9ba_hq.gif"/>   
        
      }
    </div>
  )
}

export default Favorites