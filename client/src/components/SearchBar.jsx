import React, {useState} from 'react'   
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { searchBar } from '../actions/actions'
import styles from './SearchBar.module.css';
  
const SearchBar = () => {
  const navegacion = useNavigate()
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
    var key = keyword
    e.preventDefault()
    if(key.length === 0){
      key = "no hay" 
    }
    
    dispatch(searchBar(key));
    navegacion(`/search/${key}`)
    setKeyword('')
  }


  return (
    <form className={styles.container} onSubmit={(e)=>handleSubmit(e)} >
      <input className={styles.input} type="text" onChange={(e) => handleInputChange(e)} value={keyword} placeholder="Search..." />
      
        <button className={styles.buttonSearch} type="submit" value="Search" onClick={(e)=>handleSubmit(e)}>Go</button>
    
      {/* <input className={styles.input} type="text" placeholder="Search..." /> */}
      {/* <button className={styles.buttonSearch} type="submit" onClick={inDevelopment}>Go</button> */}
    </form>
  )
}


export default SearchBar
