// import axios from 'axios'
import products from '../Products.json'
export const GET_PRODUCTS = 'GET_PRODUCTS'



export const getProducts = () => {
    return {
        type: GET_PRODUCTS,
        payload: products
    }
}
