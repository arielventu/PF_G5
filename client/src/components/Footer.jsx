import React from 'react'
import styles from './Footer.module.css'
import fb from '../image/facebook.png'
import wa from '../image/whatsapp.png'
import tw from '../image/gorjeo.png'
import inst from '../image/instagram.png'
import email from '../image/email.png'

export default function Footer() {
    return (
      <div className={styles.container}>
        <div className={styles.innercontainer}>
            <div className={styles.innercontainer2}>
                <h3 className={styles.bluetitle}>BlueBird Store</h3>
                <p className={styles.texto}>Laoreet ligula neque sed non netus nascetur at venenatis dictum, eleifend praesent turpis eget libero cras rutrum semper, magnis inceptos senectus sociis sociosqu auctor fames habitant..</p>
                <button className={styles.button}>Shop Now</button>
            </div>
            <ul className={styles.footernav}>
            <h3 className={styles.footertitles}>Home</h3>
                <li><a href="#">About us</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Press</a></li>
                <li><a href="#">iOS App</a></li>
                <li><a href="#">Android App</a></li>
            </ul>
            <ul className={styles.footernav}>
            <h3 className={styles.footertitles}>Shop</h3>
                <li><a href="#">Categories</a></li>
                <li><a href="#">All</a></li>
                <li><a href="#">Women</a></li>
                <li><a href="#">Men</a></li>
            </ul>
            <ul className={styles.sociallinks}>
            <h3 className={styles.footertitles}>Contact</h3>
                <li><img src={email} className={styles.icono}/>bluebird@gmail.com</li>
                <li><img src={fb} className={styles.icono}/>Facebook</li>
                <li><img src={wa} className={styles.icono}/>Whatsapp</li>
                <li><img src={tw} className={styles.icono}/>Twitter</li>
                <li><img src={inst} className={styles.icono}/>Instagram</li>
            </ul>
        </div>
        <div className={styles.copyright}>
            <p>Copyright &copy; 2022 by BlueBird. All rights reserved</p>
        </div>  
      </div>
    );
  }