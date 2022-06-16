import React, {useState} from 'react'
import ChatBotBB from './Chatbot'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
import fb from '../image/facebook.png'
import wa from '../image/whatsapp.png'
import tw from '../image/gorjeo.png'
import inst from '../image/instagram.png'
import email from '../image/email.png'
import ChatbotBB from './Chatbot'

export default function Footer() {
    let [bot, setBot] = useState("botClosed");
    let [bubble, setBubble] = useState("bubbleOpen");
    let [closeBot, setCloseBot] = useState("closeBotHidden");

    const handleCloseBot =() => {
        setBot("botClosed");
        setBubble("bubbleOpen");
        setCloseBot("closeBotHidden");
    }

    const handleBotClick = () => {
        if (bot === 'botClosed'){
            setBot('botOpen')
            setBubble('bubbleClosed')
            setCloseBot('closeBot')
        } 
        if (bot === 'botOpen'){
            setBot('botClosed')
            setBubble('bubbleOpen')
            setCloseBot('closeBotHidden')
        }
    }
    
    return (
        <div className={styles.container}>
            <ChatbotBB />
        <div className={styles.innercontainer}>
            <div className={styles.innercontainer2}>
                <h3 className={styles.bluetitle}>BlueBird Store</h3>
                <p className={styles.texto}>Laoreet ligula neque sed non netus nascetur at venenatis dictum, eleifend praesent turpis eget libero cras rutrum semper, magnis inceptos senectus sociis sociosqu auctor fames habitant..</p>
                <Link to='/shop' style={{ textDecoration: 'none' }}>
                    <button className={styles.buttonshop}>Shop Now</button>
                </Link>
            </div>
            <ul className={styles.footernav}>
            <h3 className={styles.footertitles}>Home</h3>
                <li><a href="#" className={styles.flink}>About us</a></li>
                <li><a href="#" className={styles.flink}>Blog</a></li>
                <li><a href="#" className={styles.flink}>Press</a></li>
                <li><a href="#" className={styles.flink}>iOS App</a></li>
                <li><a href="#" className={styles.flink}>Android App</a></li>
            </ul>
            <ul className={styles.footernav}>
            <h3 className={styles.footertitles}>Shop</h3>
                <li><a href="#" className={styles.flink}>Categories</a></li>
                <li><a href="#" className={styles.flink}>All</a></li>
                <li><a href="#" className={styles.flink}>Women</a></li>
                <li><a href="#" className={styles.flink}>Men</a></li>
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