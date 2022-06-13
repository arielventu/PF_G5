import { Action } from "history";

import {
  GET_PRODUCTS,
  GET_COLORS,
  GET_DETAILS,
  GET_CATEGORIES,
  POST_PRODUCT,
  PUT_PRODUCT,
  GET_REVIEWS,
  GET_REVIEWS_BY_ID,
  POST_REVIEW,
  FILTER_BY_BEST,
  FILTER_BY_CATEGORIES,
  FILTER_BY_COLOR,
  FILTER_BY_GENDER,
  SEARCH_BAR,
  FAVORITES,
  SHOPCAR,
  GET_STOCK_BY_PRODUCTID,
  POST_STOCK,
  PUT_STOCK,
  DELETE_STOCK,
  GET_SIZES,
  GET_SIZES_BY_ID,
  GET_ORDERS,
  GET_ORDERS_BY_ID,
  POST_ORDERS,
  PUT_ORDERS,
  GET_ORDER_DETAILS,
  GET_ORDER_DETAILS_BY_ID,
  POST_ORDER_DETAILS,
  GET_ORDER_DETAILS_BY_ORDER_ID,
  FILTER_BY_PRICE
} from "../actions/actions.js";

const initialState = {
  //hacer un estado para los filtros
  shoes: [],
  auxShoes: [],
  shoes3: [],
  categories: [],
  searchBar: [],
  favorites: [],
  shoppingCar: [],
  colors: [],
  allReviews: [],
  reviewsById: [],
  stock: [],
  sizes: [],
  orders: [],
  orderDetails: [],
  otherCat : []
};

export default function rootReducer(state = initialState, { payload, type }) {
  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        shoes: payload,
        auxShoes: payload,
        shoes3: payload,
      };
    case GET_CATEGORIES:
      // console.log(payload)
      return {
        ...state,
        categories: payload,
        otherCat : payload
      };
    case GET_COLORS:
      // console.log(payload)
      return {
        ...state,
        colors: payload,
      };
    case FAVORITES:
      return {
        ...state,
        favorites: payload,
      };
    case SHOPCAR:
      return {
        ...state,
        shoppingCar: payload,
      };
    case SEARCH_BAR:
      // console.log(payload)
      return {
        ...state,
        searchBar: payload,
      };
      case FILTER_BY_BEST:
        const best = state.auxShoes;
      const fix = [];

      payload === "All"
        ? fix.push(...best)
        : best.map((e) => {
          let sol = e.categories.map((e) => {
              if (typeof e === "object") return e.name;
              else {
                return e;
              }
            });
            return sol.includes(payload) ? fix.push(e) : null;
          });
      // console.log(fix)
      return {
        ...state,
        shoes: fix,
      };
      case FILTER_BY_CATEGORIES:
        const categories = state.auxShoes;
        const cat = [];
        
        payload === "All"
        ? cat.push(...categories)
        : categories.map((e) => {
          if (e.masterName === payload) {
            cat.push(e);
          }
        });
        // console.log(cat)
        return {
          ...state,
          shoes: cat,
        };
        case FILTER_BY_PRICE:
          const click= state.auxShoes
         const puntaje = payload === 'xpensive' ?
          payload === 'All'? puntaje.push(click):
        click.sort(function(a,b){
              if(a.price> b.price){
                  return -1;
              }
              if(b.price>a.price){
                  return 1;
              }
              return 0;
          }) : 
          click.sort(function(a,b){
              if(a.price>b.price){
                  return -1;
              }
              if(b.price> a.price){
                  return 1;
              }
              return 0;
          }) 
    
          
              return{    
                  ...state,
                 shoes :puntaje
                  }
    case FILTER_BY_COLOR:
      const allColors = state.auxShoes;
      const col = [];

      payload === "All"
        ? col.push(...allColors)
        : allColors.map((e) => {
            let color = e.stocks.map((e) => {
              return e.color.color;
            });
            return color.includes(payload) ? col.push(e) : null;
          });
      // console.log('colors', col)
      return {
        ...state,
        shoes: col,
      };
    case FILTER_BY_GENDER:
      const gender = state.auxShoes;

      const limbo = [];
      payload === "All"
        ? limbo.push(...gender)
        : gender.filter((e) => (e.gender === payload ? limbo.push(e) : null));
      console.log(limbo);
      return {
        ...state,
        shoes: limbo,
      };
    case GET_REVIEWS:
      return {
        ...state,
        allReviews: payload,
      };
    case GET_REVIEWS_BY_ID:
      return {
        ...state,
        reviewsById: payload,
      };
    case POST_REVIEW:
      return {
        ...state,
        allReviews: [...state.allReviews, payload],
      };

    // ----------- REDUCER FOR STOCK  -----------
    // Adding by ELIECER
    // DateTime: 2022-06-04 13:30
    // ------------------------------------------
    case GET_STOCK_BY_PRODUCTID:
      return { ...state, stock: payload };

    case POST_STOCK:
      return { ...state, stock: [...state.stock, payload] };

    case PUT_STOCK:
      let newUpdateData = state.stock.map((el) =>
        el.id === payload.id ? payload : el
      );
      return { ...state, stock: [...state.stock, newUpdateData] };

    case DELETE_STOCK:
      let newDelData = state.stock.filter((el) => el.id !== payload.id);
      return { ...state, stock: [...state.stock, newDelData] };

    // ----------- REDUCER FOR SIZES  -----------
    // Adding by ELIECER
    // DateTime: 2022-06-04 13:30
    // ------------------------------------------
    case GET_SIZES:
      return { ...state, sizes: payload };

    case GET_SIZES_BY_ID:
      return { ...state, sizes: payload };

    // ----------- REDUCER FOR ORDERS  -----------
    // Adding by ELIECER
    // DateTime: 2022-06-11 00:40:00
    // ------------------------------------------
    case GET_ORDERS:
      return { ...state, orders: payload };

    case GET_ORDERS_BY_ID:
      return { ...state, orders: payload };

    case POST_ORDERS:
      return { ...state, orders: [...state.orders, payload] };

    case PUT_ORDERS:
      let newOrders = state.orders.map((el) =>
        el.id === payload.id ? payload : el
      );
      return { ...state, orders: [...state.orders, newOrders] };

    // ----------- REDUCER FOR ORDER DETAILS  -----------
    // Adding by ELIECER
    // DateTime: 2022-06-11 02:20:00
    // ------------------------------------------
    case GET_ORDER_DETAILS:
      return { ...state, orderDetails: payload };

    case GET_ORDER_DETAILS_BY_ID:
      return { ...state, orderDetails: payload };

    case POST_ORDER_DETAILS:
      return { ...state, orderDetails: [...state.orderDetails, payload] };

    case GET_ORDER_DETAILS_BY_ORDER_ID:
      return { ...state, orderDetails: payload };

    default:
      return state;
  }
}
