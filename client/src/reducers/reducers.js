
import { GET_PRODUCTS,
    GET_DETAILS ,
    GET_NAME_SHOE,
    GET_REVIEWS,
    GET_CATEGORIES ,
    POST_PRODUCT,
    PUT_PRODUCT,
    FILTER_BY_BEST ,
    FILTER_BY_CATEGORIES,
    SEARCH_BAR } from '../actions/actions.js'


const initialState = {
    shoes: [],
    auxShoes: [],
    searchBar: ""

    
}

export default function rootReducer(state = initialState, {payload, type}){
    switch(type){
        case GET_PRODUCTS:
            return {
                ...state,
				shoes: payload,
				auxShoes: payload,
            }
            case SEARCH_BAR:
            return {
                ...state,
				searchBar:payload
            }
      
            case FILTER_BY_BEST:
                const best = state.auxShoes ;
                let bestFiltered;
                if(payload === 'Running') bestFiltered = best.filter(e=>e.bestFor.includes('running'))
                if(payload === 'Everyday') bestFiltered = best.filter(e=>e.bestFor.includes('everyday'))
                if(payload === 'Warm-Weather') bestFiltered = best.filter(e=>e.bestFor.includes('warm-weather'))
                if(payload === 'Cool-Weather') bestFiltered = best.filter(e=>e.bestFor.includes('cool-weather'))
                if(payload === 'Wet-Weather') bestFiltered = best.filter(e=>e.bestFor.includes('wet-weather'))
                return{
                    ...state ,
                    shoes :bestFiltered
                    
                }
            case FILTER_BY_CATEGORIES:
                const categories = state.auxShoes;
                let categorieFilt ;
                if(payload === 'MENS_TREE_RUNNERS') categorieFilt = categories.filter(e=>e.masterId === 'MENS_TREE_RUNNERS' )

                return{
                    ...state,
                   shoes : categorieFilt
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

