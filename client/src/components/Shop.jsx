import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getProducts, getCategories, filterByBestFor, filterByCategories, filterByColor} from '../actions/actions'
import { Link } from "react-router-dom";
import Card from "./Card";
import Pagination from "./Pagination"
import styles from './Shop.module.css';

const Shop = () => {
  const products = useSelector(state => state.shoes)
  const bestFor = useSelector(state => state.categories)
  const categories = useSelector(state => state.auxShoes)
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1);
  const [shoesPerPage, setShoesPerPage]= useState(15) //eslint-disable-line
  const indexOfLastShoe = currentPage * shoesPerPage; 
  const indexOfFirstShoe = indexOfLastShoe - shoesPerPage;
  const currentShoes = products.slice(indexOfFirstShoe, indexOfLastShoe);

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const firstCharUpperBestFor = (str) => {
    const arr = str.split("-");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const str2 = arr.join(" ");
    return str2;
  }

  const catArray = () => {
    // const categories = state.auxShoes;
    let joint = []
    categories.map(e=> joint.push(e.masterName))
    joint= [... new Set(joint)]
    console.log(joint)
  }
  
  useEffect(() => {
    dispatch(getCategories())
    dispatch(getProducts())
  }, [])

  const filterBestForHandler = (e) => {
    const { value } = e.target
    dispatch(filterByBestFor(value))
   
  }

  const filterCategoriesHandler = (e) => {
    const { value } = e.target
    dispatch(filterByCategories(value))
  }

  const filterColorHandler = (e) => {
    const { value } = e.target
    dispatch(filterByColor(value))
  }

  return (
    <div className={styles.container}>
      <div className={styles.flyer}>
        <h1 className={styles.titulo}>Shop</h1>
      </div>
      <div className={styles.body}>
        <div className={styles.filtersContainer}>
          <div className={styles.filters}>
            <h2 className={styles.filtersTitle}>Best For</h2>
            <ul className={styles.select}>
              {bestFor.map(e => (
                <li key={e.id}>
                  <input type="radio" id={e.id} name="bestFor" value={e.name} onChange={filterBestForHandler} />
                  <label htmlFor={e.id}>{firstCharUpperBestFor(e.name)}</label>
                </li>
              ))}               
            </ul>
          </div>
        </div>
        <div className = {styles.cards}>
          {currentShoes?.map(product => (
              <Link to={'details/' + product.id} key={'p' + product.id} style={{ textDecoration: 'none' }}>
                <Card key={product.id} id={product.id} fullName={product.masterName} price={product.price} img={product.imagecover}/>
              </Link>
          ))}
        </div>
      </div>
      <div>
        <Pagination key= {1} shoesPerPage={shoesPerPage} products={products.length} pagination={pagination} currentPage={currentPage} />
      </div>
    </div>
  )
}

export default Shop