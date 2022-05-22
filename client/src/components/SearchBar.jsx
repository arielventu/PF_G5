import React from 'react'   
import { useDispatch } from 'react-redux'
import styles from './SearchBar.module.css';
  
const SearchBar = (e) => {
  const Dispatch = useDispatch()
  const {value} = e.target
  Dispatch({
    type:"SEARCH_BAR",
    payload: value})
  return (
    <div className={styles.container}>
        <input className={styles.input} type="text" onChange={(e)=>input(e)} value={"buscar..."} />
    </div>
  )
}


export default SearchBar
