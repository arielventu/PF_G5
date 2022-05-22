import React from 'react'

const SearchBar = () => {
  console.log("first")
  const input = (e)=>{
    
    const {value} = e.target
    console.log(value)
  }
  return (
    <div>
        <input type="text" onChange={(e)=>input(e)} />
    </div>
  )
}

export default SearchBar
