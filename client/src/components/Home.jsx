import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from '../actions/actions'
import styles from './Home.module.css'

const Home = () => {
  const products = useSelector(state => state.shoes)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])
  
  console.log(products);
  
  return (
      <div className={styles.home}>
        <div className={styles.flyer}></div>
        <div className="Rated-products"></div>
      <ul>
        {products.slice(0, 4).map(product => (
          <li key={product.id}>
            {product.fullName} - {product.price}
            <img src={product.images[0].src} alt="" width="105" />
          </li>
        ))}
      </ul>
        <div className="Pre-footer"></div>
      </div>
  )
}

export default Home