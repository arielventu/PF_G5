import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { getProducts, getCategories } from '../actions/actions'
import { Link, useParams } from "react-router-dom";
import { getProducts, searchBar } from '../actions/actions';
import Card from "./Card";
import Pagination from "./Pagination"
import styles from './Shop.module.css';

const SearchResult = () => {
  const {keyword} = useParams()
  const products = useSelector(state => state.searchBar)
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1);
  const [shoesPerPage, setShoesPerPage]= useState(15) //eslint-disable-line
  const indexOfLastShoe = currentPage * shoesPerPage; 
  const indexOfFirstShoe = indexOfLastShoe - shoesPerPage;
  if(products != undefined){
    var currentShoes = products.slice(indexOfFirstShoe, indexOfLastShoe);
  }

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

   useEffect(() => { 
     dispatch(getProducts())
     dispatch(searchBar(keyword))
   }, [])
  
  useEffect(() => {
    setCurrentPage(1)
  }, [keyword])
  
  return (
    <div className={styles.container}>
      <div className={styles.flyer}>
        {/* <h1 className={styles.titulo}>Your search</h1> */}
      </div>
      <div className = {styles.cards}>
        {products.length != 0?currentShoes?.map(product => (
          <Link to={'/shop/details/' + product.id} key={'p' + product.id} style={{ textDecoration: 'none' }}>
            <Card key={product.id} id={product.id} fullName={product.masterName} price={product.price} img={product.imagecover}/>
          </Link>
        )):<img src='https://thumbs.dreamstime.com/z/lupa-trastornada-s%C3%ADmbolo-no-encontrado-lindo-y-b%C3%BAsqueda-fracasada-enfoque-para-el-icono-ningunos-resultados-convenientes-122205498.jpg'></img>}
      </div>
      <div>
        {products.length != 0?<Pagination key= {1} shoesPerPage={shoesPerPage} products={products.length} pagination={pagination} currentPage={currentPage} />:
        null}
      </div>
    </div>
  )
}

export default SearchResult