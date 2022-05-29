import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { favorites, getProducts } from '../actions/actions'
import Card from './Card'

var miObjeto = []

const Favorites = () => {
  const navegation = useNavigate()
  var array = []
  var array2 = []
  const dispatch = useDispatch()
  const favorite = useSelector(state => state.favorites)
  const products = useSelector(state => state.shoes)

  if(products.length === 0){
    dispatch(getProducts())
  }
  useEffect(() => {
    dispatch(favorites(array))
  }, [])
  if(localStorage.getItem('favoritos') != null){
    //console.log(localStorage.getItem('favoritos'))
    array = JSON.parse(localStorage.getItem('favoritos'))
  }
  if (localStorage.getItem('favoritos') === null) {
    //alert("LLena tu favorito")
    return navegation("/shop")
  }
  
   if(localStorage.getItem('favoritos') != null || !(Object.values(localStorage.getItem('favoritos')).length === 0) ){
    return (
      <div>
        {
<<<<<<< HEAD
          !(array2[0] === undefined )? array2.map(item=> <Card key={item.id} id={item.id} fullName={item.masterName} price={item.price}  img={item.imagecover} component={"favorites"}/>):
        <img style={{display:"block",margin:"auto"}} src="https://pa1.narvii.com/6607/6da40c914c7145c591c0777ada8a9a177bb4f9ba_hq.gif"/>   
=======
          !(array[0] === undefined )? array.map(item=> <Card  key={item.id} id={item.id} fullName={item.masterName} price={item.price}  img={item.imagecover} component={"favorites"}/>):
        navegation("/shop") 
>>>>>>> lobo
          
        }
      </div>
    )
      }else{
        return (
          <div>
            <h1>NO HAY NADA</h1>
          </div>
        )
      }
}

export default Favorites