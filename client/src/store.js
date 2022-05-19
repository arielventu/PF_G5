import {combineReducers,compose,applyMiddleware, legacy_createStore} from "redux"
import thunk from "redux-thunk"
import reducers from "./reducers/reducers"

const rootReducer = combineReducers ({
    shoes: reducers,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function generateStore(){
    const store = legacy_createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))
    return store;
}