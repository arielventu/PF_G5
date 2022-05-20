import React from 'react'
import image from "../image/inicio.png"
import Navbar from './Navbar'
import "./style/Home.css"

const Home = () => {
  return (
    <div>
      <Navbar/>
      <img src={image} alt="" />
    </div>
  )
}

export default Home
