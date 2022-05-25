import React, {useState} from 'react'   
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { searchBar } from '../actions/actions'
import styles from './SearchBar.module.css';
  
const SearchBar = () => {
  const dispatch = useDispatch()
  const [keyword, setKeyword] = useState('')

  // const [keyword, setKeyword] = useState('')
  // const dispatch = useDispatch();
  
  // const input = (e)=>{
  //   const {value} = e.target
  //   Dispatch({
  //     type:"SEARCH_BAR",
  //     payload: value})
  // }

  // const inDevelopment = (e) => {
  //   e.preventDefault()
  //   alert("This feature is in development")
  // }

  // const submitHandler = (e) => {
  //   e.preventDefault()
  // }
  
  const handleInputChange = (e) => {
    e.preventDefault()
    setKeyword(e.target.value)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(searchBar(keyword));
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit} >
      <input className={styles.input} type="text" onChange={(e) => handleInputChange(e)} value={keyword} placeholder="Search..." />
      <NavLink to={`/search/${keyword}`}>
        <button className={styles.buttonSearch} type="submit" value="Search" onClick={() => { setKeyword('') }}>Go</button>
      </NavLink>
      {/* <input className={styles.input} type="text" placeholder="Search..." /> */}
      {/* <button className={styles.buttonSearch} type="submit" onClick={inDevelopment}>Go</button> */}
    </form>
  )
}


export default SearchBar
