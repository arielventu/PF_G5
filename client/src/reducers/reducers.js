import { GET_PRODUCTS,
    GET_DETAILS ,
    GET_NAME_SHOE,
    GET_REVIEWS,
    GET_CATEGORIES ,
    POST_PRODUCT,
    PUT_PRODUCT,
    FILTER_BY_BEST ,
    FILTER_BY_CATEGORIES } from '../actions/actions.js'


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
                if(payload === 'MENS_TREE_DASHER_RELAY') categorieFilt = categories.filter(e=>e.masterId === 'MENS_TREE_DASHER_RELAY' )
                if(payload === "MENS_TREE_PIPERS") categorieFilt = categories.filter(e=>e.masterId === "MENS_TREE_PIPERS" )
                if(payload === 'MENS_TREE_RUNNERS') categorieFilt = categories.filter(e=>e.masterId === 'MENS_TREE_RUNNERS' )
                if(payload === 'MENS_TREE_SKIPPERS') categorieFilt = categories.filter(e=>e.masterId === 'MENS_TREE_SKIPPERS' )
                if(payload === 'MENS_TREE_TOPPERS') categorieFilt = categories.filter(e=>e.masterId === 'MENS_TREE_TOPPERS' )
                if(payload === 'MENS_WOOL_PIPERS') categorieFilt = categories.filter(e=>e.masterId === 'MENS_WOOL_PIPERS' )
                if(payload === 'MENS_WOOL_RUNNER_F,LUFFS') categorieFilt = categories.filter(e=>e.masterId === 'MENS_WOOL_RUNNER_F,LUFFS' )
                if(payload === 'MENS_WOOL_RUNNER_MIZZLES') categorieFilt = categories.filter(e=>e.masterId === 'MENS_WOOL_RUNNER_MIZZLES' )
                if(payload === 'MENS_WOOL_RUNNERS') categorieFilt = categories.filter(e=>e.masterId === 'MENS_WOOL_RUNNERS' )
                if(payload === 'MENS_WOOL_RUNNER_UP_MIZZLES') categorieFilt = categories.filter(e=>e.masterId === 'MENS_WOOL_RUNNER_UP_MIZZLES' )
                if(payload === 'WOMENS_TREE_DASHER_RELAY') categorieFilt = categories.filter(e=>e.masterId === 'WOMENS_TREE_DASHER_RELAY' )
                if(payload === 'WOMENS_TREE_PIPERS') categorieFilt = categories.filter(e=>e.masterId === 'WOMENS_TREE_PIPERS' )
                if(payload === 'WOMENS_TREE_RUNNERS') categorieFilt = categories.filter(e=>e.masterId === 'WOMENS_TREE_RUNNERS' )
                if(payload === 'WOMENS_TREE_SKIPPERS') categorieFilt = categories.filter(e=>e.masterId === 'WOMENS_TREE_SKIPPERS' )
                if(payload === 'WOMENS_TREE_TOPPERS') categorieFilt = categories.filter(e=>e.masterId === 'WOMENS_TREE_TOPPERS' )
                if(payload === 'WOMENS_WOOL_PIPERS') categorieFilt = categories.filter(e=>e.masterId === 'WOMENS_WOOL_PIPERS' )
                if(payload === 'WOMENS_WOOL_RUNNER_FLUFFS') categorieFilt = categories.filter(e=>e.masterId === 'WOMENS_WOOL_RUNNER_FLUFFS' )
                if(payload === 'WOMENS_WOOL_RUNNER_MIZZLES') categorieFilt = categories.filter(e=>e.masterId === 'WOMENS_WOOL_RUNNER_MIZZLES' )
                if(payload === 'WOMENS_WOOL_RUNNERS') categorieFilt = categories.filter(e=>e.masterId === 'WOMENS_WOOL_RUNNERS' )
                if(payload === '') categorieFilt = categories.filter(e=>e.masterId === 'WOMENS_WOOL_RUNNERS' )
let fill = {0: "MENS_TREE_DASHER_RELAY",
1: "MENS_TREE_PIPERS",
2: "MENS_TREE_RUNNERS",
3: "MENS_TREE_SKIPPERS",
4: "MENS_TREE_TOPPERS",
5: "MENS_WOOL_PIPERS",
6: "MENS_WOOL_RUNNER_F,LUFFS",
7: "MENS_WOOL_RUNNER_MIZZLES",
8: "MENS_WOOL_RUNNERS",
9: "MENS_WOOL_RUNNER_UP_MIZZLES",
10: "WOMENS_TREE_DASHER_RELAY",
11: "WOMENS_TREE_PIPERS",
12: "WOMENS_TREE_RUNNERS",
13: "WOMENS_TREE_SKIPPERS",
14: "WOMENS_TREE_TOPPERS",
15: "WOMENS_WOOL_PIPERS",
16: "WOMENS_WOOL_RUNNER_FLUFFS",
17: "WOMENS_WOOL_RUNNER_MIZZLES",
18: "WOMENS_WOOL_RUNNERS",
19: "WOMENS_WOOL_RUNNER_UP_MIZZLES"}
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

