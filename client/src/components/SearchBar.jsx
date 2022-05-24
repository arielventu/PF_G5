import React from 'react'   
import { useDispatch } from 'react-redux'
import styles from './SearchBar.module.css';
  
const SearchBar = (e) => {
  const Dispatch = useDispatch()
  
  // const input = (e)=>{
  //   const {value} = e.target
  //   Dispatch({
  //     type:"SEARCH_BAR",
  //     payload: value})
  // }

  const inDevelopment = (e) => {
    e.preventDefault()
    alert("This feature is in development")
  }

  const submitHandler = (e) => {
    e.preventDefault()
  }
  
  return (
    <form className={styles.container} onSubmit={submitHandler} >
      {/* <input className={styles.input} type="text" onChange={(e) => input(e)} placeholder="Search..." /> */}
      <input className={styles.input} type="text" placeholder="Search..." />
      <button className={styles.buttonSearch} type="submit" onClick={inDevelopment}>Go</button>
    </form>
  )
}


export default SearchBar
