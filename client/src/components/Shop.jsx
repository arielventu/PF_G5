import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getProducts , filterByBestFor , filterByCategories , filterByColor} from '../actions/actions'
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
//     dispatch(filterByColor())
    /* dispatch(filterByBestFor()) */
   // dispatch(filterByCategories())
  }, [])

  console.log(currentShoes)
  return (
    <div className={styles.container}>
      <div className={styles.flyer}>
        <h1 className={styles.titulo}>Shop</h1>
      </div>
      <div className = {styles.cards}>
        {currentShoes?.map(product => (
            <Link to={'details/' + product.id} key={'p' + product.id} style={{ textDecoration: 'none' }}>
              <Card key={product.id} id={product.id} fullName={product.masterName} price={product.price} img={product.imagecover}/>
            </Link>
        ))}
        
      </div>
      <div>
        <Pagination key= {1} shoesPerPage={shoesPerPage} products={products.length} pagination={pagination} currentPage={currentPage} />
      </div>
    </div>
  )
}

export default Shop