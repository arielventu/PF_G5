import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getProducts, getCategories,filterByPrice, orderByFn, filterBySize,filterByBestFor, filterByCategories, getColors, filterByColor, filterByGender } from '../actions/actions'
import { Link } from "react-router-dom";
import Card from "./Card";
import  EditProduct  from './EditProduct';
import Pagination from "./Pagination"
import styles from './Shop.module.css';
import {firstWordBye} from '../utils'
import {vix} from '../utils'

const Shop = () => {
  const products = useSelector(state => state.shoes)
  const auxProducts = useSelector(state => state.auxShoes)
  const bestFor = useSelector(state => state.categories)
  const categories = useSelector(state => state.shoes3)
  const colors = useSelector(state => state.colors)
  const size = useSelector(state => state.sizes)
  /* console.log(size) */
  const dispatch = useDispatch()
  /* console.log (categories) */
  const [filterSelected, setFilterSelected] = useState('')

  const [currentPage, setCurrentPage] = useState(1);
  const [shoesPerPage, setShoesPerPage]= useState(16) //eslint-disable-line
  const indexOfLastShoe = currentPage * shoesPerPage; 
  const indexOfFirstShoe = indexOfLastShoe - shoesPerPage;
  console.log(products)

  const currentShoes =products.slice(indexOfFirstShoe, indexOfLastShoe)
  
 

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  

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

  let sizes = []
  let lala = products.map((e) => {
    e.stocks.map((e) => {
        sizes.push(e.size.size)
    })
   
  })
    sizes= [... new Set(sizes)].sort()
  console.log(sizes)
  
  useEffect(() => {
    dispatch(getCategories())
    dispatch(getProducts())
    dispatch(getColors())
  }, [dispatch])
  
  const clearFilters = () => {
    dispatch(filterByBestFor('All'))
    dispatch(filterByCategories('All'))
    dispatch(filterByGender('All'))
    dispatch(filterByPrice('All'))
    setFilterSelected('')
  }
  
  /* const fiols= []
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
    name === 'sizes' && dispatch(filterBySize(value))
    
   
    setCurrentPage(1)
  }
  /* console.log(currentShoes.map( e =>e.price)) */
   const handleSort = (e) =>{
    e.preventDefault(e)
      dispatch(filterByPrice(e.target.value))
      setFilterSelected(e.target.value)
      setCurrentPage(1)
    
   }
   const handle = (e) =>{
    e.preventDefault(e)
      dispatch(orderByFn(e.target.value))
      setFilterSelected(e.target.value)
      setCurrentPage(1)
    
   }
  
  
  return (
    <div className={styles.container}>
          <div className={styles.flyer}>
            <h1 className={styles.titulo}>Shop</h1>
      </div>
      {products.length > 0 && <div className={styles.containerSort}>
        <div className={styles.divSortTitle}>
            <h1 className={styles.sortTitle}>Sort By:</h1>
        </div>
        <div className={styles.innerContSort}>  
        <h2 className={styles.sortSubtitle}>Price </h2>
          <div className={styles.divSort}>
            <div className={styles.radio}>
              <input className={styles.input} id='xpensive' /* key = {"3"} */ type="radio" name='sort' value='xpensive' onChange={e => handleSort(e)} />
              <label className={styles.radioLabel} htmlFor='xpensive'>xpensive</label>
            </div>
            <div className={styles.radio}>
              <input className={styles.input} id='cheap'/* key = {"2"} */ type="radio" name='sort' value='cheap' onChange={e => handleSort(e)} />
              <label className={styles.radioLabel} htmlFor='cheap'>cheap</label>
            </div>
          </div>
        </div>
        <div className={styles.innerContSort}> 
          <h2 className={styles.sortSubtitle}>Alphabetic</h2>
          <div className={styles.divSort}>
            <div className={styles.radio}>
              <input className={styles.input} id='AZ' type="radio" name='sort2' value='A to Z' onChange={e => handle(e)} />
              <label className={styles.radioLabel} htmlFor='AZ' >A to Z</label>
            </div>
            <div className={styles.radio}>
              <input className={styles.input} id='ZA' type="radio" name='sort2' value='Z to A' onChange={e => handle(e)} />
              <label className={styles.radioLabel} htmlFor='ZA'>Z to A</label>
            </div>
          </div>
        </div>
      </div>}
        {products.length > 0 ?
        <div className = {styles.containerp}>
          <div className={styles.body}>





            {products.length > 0 && <div className={styles.filtersContainer}>
              <div className={styles.divFiltersTitle}>
                <h1 className={styles.filtersTitle}>Filter By:</h1>
                {auxProducts.length !== products.length &&
                  <div className={styles.divButtonClearFilters}>Clear filters
                    <button className={styles.buttonClearFilters} onClick={e => clearFilters()}>x</button>
                  </div>
                }
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
              <div className={styles.divFiltersCategories}>
                <h2 className={styles.filtersSubtitle}>Sizes:</h2>
                <select className={styles.selectCategories} onChange={filterHandler} name="sizes">
                  <option className={styles.input} value='All'>All</option>
                  {
                    sizes.map(item => <option value={item}>{item}</option>)
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
                <div className={styles.radio}>
                  <input className={styles.input} id='womens' type="radio" name='gender' value='womens' onChange={filterHandler} />
                  <label className={styles.radioLabel} htmlFor='womens'>womens</label>
                </div>
                <div className={styles.radio}>
                  <input className={styles.input} id='mens' type="radio" name='gender' value='mens' onChange={filterHandler} />
                  <label className={styles.radioLabel} htmlFor='mens'>mens</label>
                </div>
              </div>
              <h2 className={styles.filtersSubtitle}>Color:</h2>
              <div className={styles.containercolors}>
                {colors.map((e, i) =>
                  <div className={styles.innercont}>
                    <label className={styles.color1} id={e} name="colors" value={e.color} style={{ backgroundColor: vix[i] }} onClick={filterHandler}></label>
                    <button className={styles.colorName} id={e.id} name="colors" value={e.color} onClick={filterHandler}>{e.color}</button>
                  </div>
                )}
              </div>
                  
            </div>}
            <div className={styles.cards}>
          
              {currentShoes?.map(product => (
                product.available !== false &&
              
                <Link to={'details/' + product.id} key={'p' + product.id} style={{ textDecoration: 'none' }}>
                  <Card key={product.id} id={product.id} fullName={product.masterName} price={product.price} img={product.imagecover} stock={product.available} />
                </Link>
            
              ))}
            </div>
          </div>
          <div>
            {currentShoes.length ?
              <Pagination key={1} shoesPerPage={shoesPerPage} products={products.length} pagination={pagination} currentPage={currentPage} />
              : null}
          </div>
        </div> :
        <div className={styles.divLoading}>
          <img src="https://thumbs.gfycat.com/PepperyMediumBrahmancow-size_restricted.gif" />
        </div>
      }
    </div>
  )
}

export default Shop