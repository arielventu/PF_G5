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

  useEffect(() => {
    
      dispatch(getProducts())
    
  }, [dispatch])
  array = localStorage.getItem('favoritos').split(",")
   const cont = array.length
  // 
  for (let i = 0; i < cont; i++) {
    console.log(array[i])
    array2.push(products?.find(item=>item.id.toString() === array[i]))
  }
  
   console.log(array2)
  
  return (
    <div>
      {
        array2.map(item=> <Card key={array2.id} id={array2.id} fullName={array2.masterName} price={array2.price} img={array2.imagecover}/>) 
      }
    </div>
  )
}

export default Favorites