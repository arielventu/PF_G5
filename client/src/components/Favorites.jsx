import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/actions'
import Card from './Card'
import Construction from './Construction'
var array = []
const Favorites = () => {
  const dispatch = useDispatch()
  const favorite = useSelector(state => state.favorites)
  const products = useSelector(state => state.shoes)
  console.log(favorite)

  useEffect(() => {
    if (!products) {
      dispatch(getProducts())
    }
  }, [])
  array = localStorage.getItem('favoritos').split(",")
  console.log(array)
  console.log(array.length)
   const cont = array.length
  for (let i = 0; i == cont; i++) {
    console.log(cont +1)
    array.push(products.find(item=>item.id.toString() === favorite[i]))
    
  }
  // console.log(array)
  return (
    <div>
       {/* <Card key={product.id} id={product.id} fullName={product.masterName} price={product.price} img={product.imagecover}/> */}
        <Construction/>
    </div>
  )
}

export default Favorites