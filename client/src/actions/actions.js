import axios from 'axios';
import products from '../Products.json'
export const GET_PRODUCTS = 'GET_PRODUCTS'
export const SEARCH_BAR = 'SEARCH_BAR'
// export const GET_NAME_SHOE = 'GET_NAME_SHOE'
export const POST_PRODUCT = 'POST_PRDUCT'
export const PUT_PRODUCT = 'PUT_PRODUCT'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_DETAILS = 'GET_DETAILS'
export const GET_REVIEWS = 'GET_REVIEWS'
export const GET_COLORS = 'GET_COLORS'
export const FILTER_BY_BEST = 'FILTER_BY_BEST'
export const FILTER_BY_CATEGORIES = 'FILTER_BY_CATEGORIES'
export const FILTER_BY_COLOR = 'FILTER_BY_COLOR'
export const FILTER_BY_GENDER = 'FILTER_BY_GENDER'
export const FAVORITES = 'FAVORITES'
export const SHOPCAR = 'SHOPCAR'

// export const getProducts = () => {
//     return {
//         type: 'GET_PRODUCTS',
//         payload: products 
//     }
// }

export function getProducts (){
     return async function (dispatch){
         var json =  await axios.get('/products');
        return dispatch({
             type : 'GET_PRODUCTS', 
            payload :json.data,   
        })
    };
 } 

export const filterByBestFor = (payload)=>{
    return  {
        type: 'FILTER_BY_BEST',
        payload
    }       
}
export const favorites = ()=>{
    var array = []
    if(localStorage.getItem('favoritos') != null){
        array = localStorage.getItem('favoritos').split(",")
      }
    return  {
        type: 'FAVORITES',
        payload :array
    }       
}
export const ShopCar = ()=>{
    var array = []
    if(localStorage.getItem('favoritos') != null){
        array = localStorage.getItem('favoritos').split(",")
      }
    return  {
        type: 'SHOPCAR',
        payload :array
    }       
}


export const filterByCategories = (payload)=>{
    // console.log(payload)
    return  {
        type: 'FILTER_BY_CATEGORIES',
        payload 
    }       
}

export const filterByColor = (payload)=>{
    return  {
        type: 'FILTER_BY_COLOR',
        payload
    }       
}

export const filterByGender = (payload)=>{
    return  {
        type: 'FILTER_BY_GENDER',
        payload
    }       
}

export function searchBar (keyword){ 
    return async function (dispatch){
        try{
            await axios.get(`/products?search=${keyword}`)
            .then(yeison => {
                //  console.log(yeison.data)
            dispatch({
                type : 'SEARCH_BAR',
                payload: yeison.data
            })
        })
        }catch(error){
            console.log(error)}
    }
}

export function getCategories (){ 
    return async function (dispatch){
        try{
            await axios.get(`/categories`)
                .then(yeison => {
                    // console.log(yeison.data)
                dispatch({
                    type : 'GET_CATEGORIES',
                    payload: yeison.data
                })
            })
        }catch(error){
            console.log(error)}
    }
}

export function getColors() { 
    return async function (dispatch){
        try{
            await axios.get(`/colors`)
                .then(yeison => {
                    // console.log(yeison.data)
                dispatch({
                    type : 'GET_COLORS',
                    payload: yeison.data
                })
            })
        }catch(error){
            console.log(error)}
    }
}

export function postProduct (payload){
    return async function(dispatch){
        try{
            var yeison = await axios.post("/product",payload)
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
            var yeison = await axios.put("/product",payload)
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
            var json = await axios.get(`/products/${id}`);
        return dispatch( {
            type : "GET_DETAILS",
            payload: json.data
        })
        }catch(error){
            console.log(json.data)
        }
    }
}

