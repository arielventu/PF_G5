import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getProducts, getCategories,filterByPrice, getSizes, otroFilterMas,filterByBestFor, filterByCategories, getColors, filterByColor, filterByGender} from '../actions/actions'
import { Link } from "react-router-dom";
import Card from "./Card";
import  EditProduct  from './EditProduct';
import Pagination from "./Pagination"
import styles from './Shop.module.css';
import {firstWordBye} from '../utils'
import {vix} from '../utils'

const Shop = () => {
  const products = useSelector(state => state.shoes)
  const auxProducts = useSelector(state => state.shoes3)
  const bestFor = useSelector(state => state.categories)
  const categories = useSelector(state => state.auxShoes)
  const colors = useSelector(state => state.colors)
  const size = useSelector(state => state.sizes)
  console.log(size)
  const dispatch = useDispatch()
  console.log (categories)
  // const [filterSelected, setFilterSelected] = useState('')
  console.log(products)
  const [currentPage, setCurrentPage] = useState(1);
  const [shoesPerPage, setShoesPerPage]= useState(16) //eslint-disable-line
  const indexOfLastShoe = currentPage * shoesPerPage; 
  const indexOfFirstShoe = indexOfLastShoe - shoesPerPage;
  
  const currentShoes =products.slice(indexOfFirstShoe, indexOfLastShoe);
  // q current shoes haga el slice con pangolin ordenado
  
  /* console.log(pangolin) */
  /* const pangolin =products.filter(e=> e.stock !== undefined)
  const currentShoes = pangolin.slice(indexOfFirstShoe, indexOfLastShoe); */
/*   console.log(pangolin) */

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  
 /* const fly = products.sort(function(a,b){
      if(a.price > b.price){
          return 1;
      }
      if(b.price > a.price){
          return -1
      }
      return 0
  })
  console.log(fly) */

  const firstCharUpperBestFor = (str) => {
    const arr = str.split("-");
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const str2 = arr.join(" ");
    return str2;
  }
  let joint = []
  categories.map(e=> joint.push(e.masterName))
  joint= [... new Set(joint)].sort()

  
  useEffect(() => {
    
    dispatch(getCategories())
    dispatch(getProducts())
    dispatch(getColors())
    
   
  }, [])
  const clearFilters = () => {
    dispatch(filterByBestFor('All'))
    dispatch(filterByCategories('All'))
    dispatch(filterByGender('All'))
    dispatch(otroFilterMas('All'))
  }
/*   const fiols= []
  products.map((e) => {
   var quik =  e.stocks.map((e)=> {
     return{
       availbale : Object.values ([e.color.color]),
       size: Object.values([e.size.size])    
      }
    })
    delete e.id  
    fiols.push(quik)
  })
  console.log(fiols) */
  const filterHandler = (e) => {
    e.preventDefault()
    const { value, name } = e.target
    name === 'categories' && dispatch(filterByCategories(value))
    name === 'bestFor' && dispatch(filterByBestFor(value))
    name === 'colors' && dispatch(filterByColor(value))
    name === 'gender' && dispatch(filterByGender(value))
   /*  name === "sort" &&  dispatch(set) */
    setCurrentPage(1)
    
  }
  console.log(currentShoes.map( e =>e.price))
   
  return (
    <div className={styles.container}>
      <div className={styles.flyer}>
        <h1 className={styles.titulo}>Shop</h1>
      </div>
      <div className={styles.body}>
        { products.length > 0 && <div className={styles.filtersContainer}>
            <div className={styles.divFiltersTitle}>
              <h1 className={styles.filtersTitle}>Filter By:</h1>
              {auxProducts.length !== products.length &&
                <div className={styles.divButtonClearFilters}>Clear filters
                  <button className={styles.buttonClearFilters} onClick={e => clearFilters()}>x</button>
                </div>}
            </div>
            <div className={styles.divFiltersBestFor}>
                <h2 className={styles.filtersSubtitle}>sorder</h2>
                <div>
                  <input className={styles.input} type="radio"  name= 'xpensive' value='womens'onChange={filterHandler} />
                  <label className={styles.radioLabel} >xpensive</label>
                </div>
                <div>
                  <input className={styles.input} type="radio"  name= 'cheap' value='mens'onChange={filterHandler} />
                  <label className={styles.radioLabel} >cheap</label>
                </div>
              </div>
            <div className={styles.divFiltersBestFor}>
              <h2 className={styles.filtersSubtitle}>Best For</h2>
              {bestFor.map(e => (
                <div key={e.id} className={styles.radio}>
                  <input className={styles.input} type="radio" id={e.id} name="bestFor" value={e.name} onChange={filterHandler} />
                  <label className={styles.radioLabel} htmlFor={e.id}>{firstCharUpperBestFor(e.name)}</label>
                </div>
              ))}
            </div>
            <div className = {styles.divFiltersCategories}>
            <h3 className={styles.filtersSubtitle}>Sizes:</h3>
            <select className={styles.selectCategories} onChange={filterHandler} name="sizez">
            <option className={styles.input} value='All'>All</option>
             {
             size.map(item => <option value={item.size}>{item.size}</option>)
             }
            </select>
          </div>
            <div className={styles.divFiltersCategories}>
              <h2 className={styles.filtersSubtitle}>Categories</h2>
              <select className={styles.selectCategories} onChange={filterHandler} name="categories">
                <option className={styles.input} value='All'>All</option>
                {joint.map((e) => (
                  <option className={styles.input} id={e} value={e}>{e}</option>
                ))}
              </select>
            </div>
              <div className={styles.divFiltersBestFor}>
                <h2 className={styles.filtersSubtitle}>Genre</h2>
                <div>
                  <input className={styles.input} type="radio"  name= 'gender' value='womens'onChange={filterHandler} />
                  <label className={styles.radioLabel} >womens</label>
                </div>
                <div>
                  <input className={styles.input} type="radio"  name= 'gender' value='mens'onChange={filterHandler} />
                  <label className={styles.radioLabel} >mens</label>
                </div>
              </div>
              <div className={styles.containercolors}>
                   { colors.map((e , i)=>
                   <div className={styles.innercont}>
                     <label className={styles.color1 } id ={e} name = "colors" value={e.color} style={{ backgroundColor: vix[i]}}onClick= {filterHandler}></label>
                     <button className={styles.colorName} id ={e.id} name = "colors" value={e.color} onClick= {filterHandler}>{e.color}</button>
                   </div>
                   )}
              </div>
                  
        </div>}
        <div className = {styles.cards}>
          
          {currentShoes?.map(product => (
              <Link to={'details/' + product.id} key={'p' + product.id} style={{ textDecoration: 'none' }}>
                <Card key={product.id} id={product.id} fullName={product.masterName} price={product.price} img={product.imagecover} stock = {product.available}/>
              </Link>
          ))}
        </div>
      </div>
      <div>
        {currentShoes.length ?
          <Pagination key={1} shoesPerPage={shoesPerPage} products={products.length} pagination={pagination} currentPage={currentPage} />
          : null}
      </div>
    </div>
  )
}

export default Shop