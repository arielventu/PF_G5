import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getProducts}  from '../actions/actions'
// import image from "../image/inicio.png"

const Home = () => {
  const products = useSelector(state => state.shoes)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  return (
    <div>
      {/* <img src={image} alt="" /> */}
      <h1>Bienvenido a la tienda</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.fullName} - {product.price}
            <img src={product.images[0].src} alt="" width="105" />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home