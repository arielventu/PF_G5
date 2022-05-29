import { Action } from 'history';

import {
    GET_PRODUCTS,
    GET_DETAILS ,
    GET_REVIEWS,
    GET_CATEGORIES,
    POST_PRODUCT,
    PUT_PRODUCT,
    FILTER_BY_BEST ,
    FILTER_BY_CATEGORIES,
    FILTER_BY_COLOR,
    SEARCH_BAR,
    FAVORITES, 
    SHOPCAR,
} from '../actions/actions.js'

const initialState = {
    shoes: [],
    auxShoes: [],
    categories: [],
    searchBar: [],
    favorites:[],
    shoppingCar:[],
}

export default function rootReducer(state = initialState, {payload, type}){
    switch(type){
        case GET_PRODUCTS:
            return {
                ...state,
				shoes: payload,
				auxShoes: payload,
            }
        case GET_CATEGORIES:
            // console.log(payload)
            return {
                ...state,
				categories: payload,
            }
        case FAVORITES:
            return {
                ...state,
                favorites: payload,
            }
        case SHOPCAR:
            return {
                ...state,
                shoppingCar: payload,
            }
        case SEARCH_BAR:
            console.log(payload)
            return {
                ...state,
				searchBar: payload
            }
        case FILTER_BY_BEST:
            const best = state.auxShoes;
            const fix = [];
            best.map((e)=>{
                let sol =e.categories.map((e)=>{
                    if(typeof e === 'object'){
                    return(e.name)
                    } else{ return e }})
                    return sol.includes(payload) ===true? 
                        fix.push(e):null})
            return{
                ...state ,
                shoes : fix
            }
        case FILTER_BY_CATEGORIES:
            const categories = state.auxShoes;

            const cat = []
            categories.map((e) => {
            if(e.masterId === payload){
                cat.push(e)
            }})
            console.log(cat)
            return{
                ...state,
                /* shoes :cat */
            }
        case FILTER_BY_COLOR:
            const allColors = state.auxShoes; 
            
            const col = [];
            allColors.map((e) => {
                if(e.colorName === payload){
                    col.push(e)
                }})
                console.log(col)
        
        console.log (col)
            return{
                ...state,
                shoes : col
            }
        default: 
            return state
    }
} 

