import React from 'react'   
import { useDispatch } from 'react-redux'

const SearchBar = () => {
  const Dispatch = useDispatch()

  const input = (e)=>{
    const {value} = e.target
    Dispatch({
      type:"SEARCH_BAR",
      payload: value})
    console.log(value)
  }
    return (
    <div>
        <input type="text" onChange={(e)=>input(e)} />
    </div>
  )
}


export default SearchBar
