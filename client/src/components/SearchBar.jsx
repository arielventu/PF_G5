import React, {useState, useEffect} from 'react'   
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { searchBar, getProducts } from '../actions/actions'
import styles from './SearchBar.module.css';
  
const SearchBar = () => {
  const navegacion = useNavigate()
  const dispatch = useDispatch()
  const [keyword, setKeyword] = useState('')
  const data = useSelector((state) => state.shoes3);
  useEffect(() => {
    dispatch(getProducts());
  }, [data.length]);
  
  const dataMap = data.map(e => e.name);
<<<<<<< HEAD
  //console.log(dataMap, "data data data");



=======
  
>>>>>>> de673b868b999d1eeabba03e2d6809f06fa69029
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
    
    setKeyword(e.target.value)
  }
  

  const handleSearchBar = (item) => {
    
    setKeyword(item)
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
    <div className={styles.container}>

    <form className={styles.searchcontainer} onSubmit={(e)=>handleSubmit(e)} >
      <div className={styles.searchinner}>
      <input className={styles.input} type="text" onChange={(e) => handleInputChange(e)} value={keyword} placeholder="Search..." />
        <button className={styles.buttonSearch} type="submit" value="Search" onClick={(e)=>handleSubmit(e)}>Go</button>
      </div>
        <div className={styles.dropdown}>
          {dataMap
            .filter((item) => {
              const searchTerm = keyword.toLowerCase();
              const fullName = item.toLowerCase();

              return (
                searchTerm &&
                fullName.startsWith(searchTerm) &&
                fullName !== searchTerm
              );
            })
            .slice(0, 10)
    
            .map((item) => (
              <div
                onClick={() => handleSearchBar(item)}
                className={styles.dropdownrow}
                // key={item}
              >
                {item}
              </div>
            ))}
        </div>
      {/* <input className={styles.input} type="text" placeholder="Search..." /> */}
      {/* <button className={styles.buttonSearch} type="submit" onClick={inDevelopment}>Go</button> */}
    </form>
    </div>
  )
}


export default SearchBar
