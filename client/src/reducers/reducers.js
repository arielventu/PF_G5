import { Action } from 'history';

import {
    GET_PRODUCTS,
    GET_COLORS,
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

} from '../actions/actions.js'

const initialState = { //hacer un estado para los filtros
    shoes: [],
    auxShoes: [],
    categories: [],
    searchBar: [],
    favorites: [],
    colors: [],
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
        case GET_COLORS:
            // console.log(payload)
            return {
                ...state,
				colors: payload,
            }
        case FAVORITES:
            return {
                ...state,
                favorites: payload,
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

            payload === 'All' ?
                fix.push(...best)
            : best.map((e)=>{
            let sol = e.categories.map((e)=>{
                if(typeof e === 'object') return(e.name)
                else { return e }
            })
                return sol.includes(payload) ? fix.push(e) : null
            })
                // console.log(fix)
            return{
                ...state ,
                shoes : fix
            }
        case FILTER_BY_CATEGORIES:
            const categories = state.auxShoes;
            const cat = []

            payload === 'All' ?
                cat.push(...categories) 
            : categories.map((e) => {
                if(e.masterName === payload){
                    cat.push(e)
                    }
                })
            // console.log(cat)
            return{
                ...state,
                shoes :cat
            }
        case FILTER_BY_COLOR:
            // const allColors = state.colors; 
            
            const col = [];

            // allColors.map((e) => {
            //     if(e.colorName === payload){
            //         col.push(e)
            //     }})
                // console.log(col)
            
            
            return{
                ...state,
                shoes : col
            }
        default: 
            return state
    }
} 

