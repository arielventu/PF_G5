import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getProducts , filterByBestFor , filterByCategories}  from '../actions/actions'
import { Link } from "react-router-dom";
import Card from "./Card";
import Pagination from "./Pagination"
import styles from './Shop.module.css';

const Shop = () => {
  const products = useSelector(state => state.shoes)
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1);
  const [shoesPerPage, setShoesPerPage]= useState(15) //eslint-disable-line
  const indexOfLastShoe = currentPage * shoesPerPage; 
  const indexOfFirstShoe = indexOfLastShoe - shoesPerPage;
  const currentShoes = products.slice(indexOfFirstShoe, indexOfLastShoe);

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
console.log(products)
  useEffect(() => {
    dispatch(getProducts())
    /* dispatch(filterByBestFor()) */
    dispatch(filterByCategories())
  }, [])


  return (
    <div className={styles.container}>
      {/* <img src={image} alt="" /> */}
      <h1 className={styles.titulo}>Bienvenido a la tienda</h1>
      <div className = {styles.cards}>
        {currentShoes?.map(product => (
            <Link to={'details/' + product.id} key={'p' + product.id} style={{ textDecoration: 'none' }}>
              <Card key={product.id} id={product.id} fullName={product.fullName} price={product.price} img={product.images[0].src}/>
            </Link>
        ))}
        
      </div>
      <div>
        <Pagination key= {1} shoesPerPage={shoesPerPage} products={products.length} pagination={pagination}/>
      </div>
    </div>
  )
}

export default Shop