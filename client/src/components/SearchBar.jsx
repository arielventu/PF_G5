import React from 'react'   
import { useDispatch } from 'react-redux'
import styles from './SearchBar.module.css';
  
const SearchBar = (e) => {
  const Dispatch = useDispatch()
  
  const input = (e)=>{
    const {value} = e.target
    Dispatch({
      type:"SEARCH_BAR",
      payload: value})
  }
  
  return (
    <form className={styles.container}>
      <input className={styles.input} type="text" onChange={(e) => input(e)} placeholder="Search..." />
      <button className={styles.buttonSearch} type="submit">Go</button>
    </form>
  )
}


export default SearchBar
