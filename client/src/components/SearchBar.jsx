import React from 'react'   
import { useDispatch } from 'react-redux'
import { getSearchBar } from '../actions/actions'

const SearchBar = () => {
  const dis = useDispatch()

  const input = (e)=>{
    const {value} = e.target
    //Dispatch(getSearchBar(value))
    console.log(value)
  }
    return (
    <div>
        <input type="text" onChange={(e)=>input(e)} />
    </div>
  )
}


export default SearchBar
