import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from '../actions/actions'
import styles from './Home.module.css'
import portada from '../image/jordanportada.jpg'

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
      <div className={styles.titlesContainer}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Get the Latest Shoes Models From Us</h1>
        </div>
        <div className={styles.subtitleContainer}>
          <h2 className={styles.subtitle}>Are you ready for the next step?</h2>
        </div>
        <button className={styles.buttonShopNow}>Shop Now</button>
      </div>
      <div className={styles.divImageFlyer}>
        <img className={styles.imageFlyer} src={portada} alt=""/>
        </div>
        <div className={styles.ratedProducts}></div>
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