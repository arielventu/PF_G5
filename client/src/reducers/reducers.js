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
  GET_SIZES,
  GET_SIZES_BY_ID,
} from "../actions/actions.js";

const initialState = {
  //hacer un estado para los filtros
  shoes: [],
  auxShoes: [],
  categories: [],
  searchBar: [],
  favorites: [],
  shoppingCar: [],
  colors: [],
  allReviews: [],
  stock: [],
  sizes: [],
};

export default function rootReducer(state = initialState, { payload, type }) {
  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        shoes: payload,
        auxShoes: payload,
      };
    case GET_CATEGORIES:
      // console.log(payload)
      return {
        ...state,
        categories: payload,
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
        allReviews: payload,
      };
    case POST_REVIEW:
      return {
        ...state,
        allReviews: [
          ...state.allReviews,
          payload
        ],
      };
    // reducer for products stock
    case GET_STOCK_BY_PRODUCTID:
      return {
        ...state,
        stock: payload
      };
    // reducer for Sizes
    case GET_SIZES:
      return {
        ...state,
        sizes: payload
      };
    case GET_SIZES_BY_ID:
      return {
        ...state,
        sizes: payload
      };
    default: 
      return state
  }
}

