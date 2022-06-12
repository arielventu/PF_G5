import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { favorites, getProducts } from '../actions/actions'
import Card from './Card'
import styles from './Favorites.module.css'

//import Construction from './Construction'

const Favorites = () => {
  const navegation = useNavigate()
  var array = []
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
    array = JSON.parse(localStorage.getItem('favoritos'))
  }
  if (localStorage.getItem('favoritos') === null) {
    return navegation("/shop")
  }
  
   if(localStorage.getItem('favoritos') != null || !(Object.values(localStorage.getItem('favoritos')).length === 0) ){
    return (
      <div className={styles.containerfav}>
        <h1 className={styles.titulofav}>Favorites</h1>
        <div className={styles.icontainerfav}>
        {
            !(array[0] === undefined) ? array.map(item =>
              <Card className={styles.cardfav}
                key={item.id}
                id={item.id}
                fullName={item.masterName}
                price={item.price}
                img={item.imagecover}
                component={"favorites"} />) :
          navegation("/shop") 
        }
        </div>
      </div>
    )
      }else{
        return (
          <div>
            <h1>nothing to show here</h1>
          </div>
        )
      }
}

export default Favorites