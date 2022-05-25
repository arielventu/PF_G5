import axios from 'axios';
import products from '../Products.json'
export const GET_PRODUCTS = 'GET_PRODUCTS'
export const SEARCH_BAR = 'SEARCH_BAR'
export const GET_NAME_SHOE = 'GET_NAME_SHOE'
export const POST_PRODUCT = 'POST_PRDUCT'
export const PUT_PRODUCT = 'PUT_PRODUCT'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_DETAILS = 'GET_DETAILS'
export const GET_REVIEWS = 'GET_REVIEWS'
export const FILTER_BY_BEST = 'FILTER_BY_BEST'
export const FILTER_BY_CATEGORIES = 'FILTER_BY_CATEGORIES'
export const FILTER_BY_COLOR = 'FILTER_BY_COLOR'
export const FAVORITES = 'FAVORITES'

// export const getProducts = () => {
//     return {
//         type: 'GET_PRODUCTS',
//         payload: products 
//     }
// }

export function getProducts (){
     return async function (dispatch){
         var json =  await axios.get('http://localhost:3001/products');
        return dispatch({
             type : 'GET_PRODUCTS', 
            payload :json.data,   
        })
    };
 } 

export const filterByBestFor = ()=>{
    return  {
        type: 'FILTER_BY_BEST',
        payload :'wet-weather'
    }       
}
export const favorites = (array)=>{
    return  {
        type: 'FAVORITES',
        payload :array
    }       
}

export const filterByCategories = ()=>{

    return  {
        type: 'FILTER_BY_CATEGORIES',
        payload :'WOMENS_WOOL_RUNNER_UP_MIZZLES'
    }       
}

export const filterByColor = ()=>{

    return  {
        type: 'FILTER_BY_COLOR',
        payload : "Black Sands (Asphalt Sole)"
    }       
}

export function getNameShoes (name){ 
    return async function (dispatch){
        try{
            let yeison = await axios.get(`http://localhost:3001/products?name=${name}`)
            return dispatch({
                type : 'GET_NAME_SHOE',
                payload : yeison.data
            })
        }catch(error){
            console.log(error)}
    }
}

export function getCategories (){ 
    return async function (dispatch){
        try{
            let yeison = await axios.get(`http://localhost:3001/products/categories`)
            return dispatch({
                type : 'GET_CATEGORIES',
                payload : yeison.data
            })
        }catch(error){
            console.log(error)}
    }
}

export function postProduct (payload){
    return async function(dispatch){
        try{
            var yeison = await axios.post("http://localhost:3001/product",payload)
            return yeison;
        }catch (error){
            console.log(error)
            console.log (yeison)
        }
    } 
}

export function editProduct (payload){
    return async function(dispatch){
        try{
            var yeison = await axios.put("http://localhost:3001/product",payload)
            return yeison;
        }catch (error){
            console.log(error)
            console.log (yeison)
        }
    } 
}

export function getDetail(id){
    return async function(dispatch){
        try{
            var json = await axios.get(`http://localhost:3001/products/${id}`);
        return dispatch( {
            type : "GET_DETAILS",
            payload: json.data
        })
        }catch(error){
            console.log(json.data)
        }
    }
}

