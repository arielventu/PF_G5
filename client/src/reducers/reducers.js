import { GET_PRODUCTS } from '../actions/actions.js'


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
      

        default: 
            return state
    }

} 

