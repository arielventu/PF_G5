const initialState ={
    zapatos:[],

    
}

const HOME = "HOME"
export default function reducer(state = initialState , action){
    switch(action.type){
        case HOME:
            return {
                ...state,
                countrie:action.payload,
                filContry:action.payload,
                load:action.load
            }
      

        default: 
            return state
    }
} 

