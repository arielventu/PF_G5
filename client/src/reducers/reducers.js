import { GET_PRODUCTS,SEARCH_BAR} from '../actions/actions.js'


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
      

        default: 
            return state
    }
} 

