import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Construction.module.css'

const Construction = () => {
  return (
    <div className={styles.home}>
      <div className={styles.flyer}></div>
      <div className={styles.titlesContainer}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Site Under Construction</h1>
          <img src="https://i.pinimg.com/originals/84/a0/9d/84a09dfb5caedaf3d1b0bbbadd030218.gif" alt="under construction" style={{width:"158px", marginLeft:"1rem"}} />
        </div>
        <div className={styles.subtitleContainer}>
          <h2 className={styles.subtitle}>Are you ready for the next step?</h2>
        </div>
        <Link to='/shop' style={{ textDecoration: 'none' }}>
          <button className={styles.buttonShopNow}>Shop Now</button>
        </Link>
      </div>
    </div>
  )
}

export default Construction