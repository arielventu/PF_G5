import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from '../actions/actions'
import {Link} from 'react-router-dom'
import Card from './Card'

import styles from './Home.module.css'
import portada from '../image/imgportada.jpg'
import carrousel from '../image/1.png'
import carrousel3 from '../image/3.jpg'
import carrousel4 from '../image/6.jpg'
import carrousel2 from '../image/2.jpg'


const Home = () => {
  const bestRated = useSelector(state => state.shoes)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])
  
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
        <Link to='/shop' style={{ textDecoration: 'none' }}>
          <button className={styles.buttonShopNow}>Shop Now</button>
        </Link>
      </div>
      <div className={styles.divImageFlyer}>
        <img className={styles.imageFlyer} src={portada} alt=""/>
        </div>
      <div className={styles.ratedProducts}>
        <h1 className={styles.ratedProductsTitle}>&#9733; Best Rated Products &#9733;</h1>
        </div>
      <div className = {styles.cards}>
        {bestRated?.slice(0,5).map(product => (
            <Link to={'/Shop/details/' + product.id} key={'p' + product.id} style={{ textDecoration: 'none' }}>
              <Card key={product.id} id={product.id} fullName={product.masterName} price={product.price} img={product.imagecover}/>
            </Link>
        ))}
      </div>
      <div id='slider'className={styles.galeria}>
        <figure>
          <img src={carrousel} className={styles.carrouselimg}/>
          <img src={carrousel3} className={styles.carrouselimg}/>
          <img src={carrousel4} className={styles.carrouselimg}/>
          <img src={carrousel2} className={styles.carrouselimg}/>
        </figure>
      </div>
      </div>
  )
}

export default Home