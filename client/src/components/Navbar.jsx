import React from 'react'
import SearchBar from './SearchBar'
import carrito from "../image/carrito2.png"

const Navbar = () => {
  return (
    <div className='conteiner'>
        <div className='botones'>
            <h4 style={{marginLeft:"20px"}}>Home</h4>
            <h4 style={{marginLeft:"20px"}}>Shop</h4>
            <h4 style={{marginLeft:"20px"}}>About Us</h4>
            <h4 style={{marginLeft:"20px"}}>Contact</h4>
            <img src={carrito}alt="" style={{height:"30px",width:"30px",marginLeft:"20px",marginRight:"20px"}} />
            <SearchBar />
            <button>Login</button>
            <button>Create</button>
        </div>
    </div>
  )
}

export default Navbar