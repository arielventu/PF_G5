import { Action } from 'history';
import { GET_PRODUCTS,
    GET_DETAILS ,
    GET_NAME_SHOE,
    GET_REVIEWS,
    GET_CATEGORIES ,
    POST_PRODUCT,
    PUT_PRODUCT,
    FILTER_BY_BEST ,
    FILTER_BY_CATEGORIES,
    FILTER_BY_COLOR } from '../actions/actions.js'


const initialState = {
    shoes: [],
    auxShoes: [],

    
}

export default function rootReducer(state = initialState, {payload, type}){
    switch(type){
        case GET_PRODUCTS:
            return {
                ...state,
				shoes: payload,
				auxShoes: payload,
            }
            case FILTER_BY_BEST:
                const best = state.auxShoes ;
                
                let bestFiltered = [];
                best.map((e) => {
                e.bestFor.includes(payload)?
                bestFiltered.push(e):
                console.log('macha')
            })
             console.log(bestFiltered)
                return{
                    ...state ,
                    shoes :bestFiltered
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
                   shoes :cat
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
            case GET_NAME_SHOE:return{...state,shoes :payload}
            case GET_DETAILS :return{...state , shoesDetail : payload}    
            case GET_REVIEWS :return{...state , shoes : payload}    
            case GET_CATEGORIES :return{...state , categories : payload}   
            case POST_PRODUCT :return{...state , categories : payload}   
            case PUT_PRODUCT :return{...state , categories : payload}   

        default: 
            return state
    }
} 

