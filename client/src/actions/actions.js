import axios from "axios";
import products from "../Products.json";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const SEARCH_BAR = "SEARCH_BAR";
// export const GET_NAME_SHOE = 'GET_NAME_SHOE'
export const POST_PRODUCT = "POST_PRDUCT";
export const PUT_PRODUCT = "PUT_PRODUCT";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_DETAILS = "GET_DETAILS";
export const GET_REVIEWS = "GET_REVIEWS";
export const GET_REVIEWS_BY_ID = "GET_REVIEWS_BY_ID";
export const POST_REVIEW = "POST_REVIEW";
export const GET_COLORS = "GET_COLORS";
export const FILTER_BY_BEST = "FILTER_BY_BEST";
export const FILTER_BY_PRICE = "FILTER_BY_PRICE";
export const ORDER_BY_FN = "ORDER_BY_FN";
export const FILTER_BY_CATEGORIES = "FILTER_BY_CATEGORIES";
export const FILTER_BY_COLOR = "FILTER_BY_COLOR";
export const FILTER_BY_GENDER = "FILTER_BY_GENDER";
export const FILTER_BY_SIZE = "FILTER_BY_SIZE";
export const FAVORITES = "FAVORITES";
export const SHOPCAR = "SHOPCAR";
export const GET_STOCK_BY_PRODUCTID = "GET_STOCK_BY_PRODUCTID";
export const POST_STOCK = "POST_STOCK";
export const PUT_STOCK = "PUT_STOCK";
export const DELETE_STOCK = "DELETE_STOCK";
export const GET_SIZES = "GET_SIZES";
export const GET_SIZES_BY_ID = "GET_SIZES_BY_ID";
export const GET_ORDERS = "GET_ORDERS";
export const GET_ORDERS_BY_ID = "GET_ORDERS_BY_ID";
export const POST_ORDERS = "POST_ORDERS";
export const PUT_ORDERS = "PUT_ORDERS";
export const GET_ORDER_DETAILS = "GET_ORDER_DETAILS";
export const GET_ORDER_DETAILS_BY_ID = "GET_ORDER_DETAILS_BY_ID";
export const GET_ORDERS_BY_CUSTOMER_ID = "GET_ORDERS_BY_CUSTOMER_ID";
export const GET_ORDER_DETAILS_BY_ORDER_ID = "GET_ORDER_DETAILS_BY_ORDER_ID";
export const POST_ORDER_DETAILS = "POST_ORDER_DETAILS";

// export const getProducts = () => {
//     return {
//         type: 'GET_PRODUCTS',
//         payload: products
//     }
// }

export function getProducts() {
  return async function (dispatch) {
    var json = await axios.get("/products");
    return dispatch({
      type: "GET_PRODUCTS",
      payload: json.data,
    });
  };
}

export const filterByBestFor = (payload) => {
  return {
    type: "FILTER_BY_BEST",
    payload,
  };
};
export const favorites = () => {
  var array = [];
  if (localStorage.getItem("favoritos") != null) {
    array = localStorage.getItem("favoritos");
  }
  return {
    type: "FAVORITES",
    payload: array,
  };
};
export const ShopCar = () => {
  var array = [];
  if (localStorage.getItem("carrito") != null) {
    array = localStorage.getItem("carrito");
  }
  return {
    type: "SHOPCAR",
    payload: array,
  };
};

export const filterByCategories = (payload) => {
  // console.log(payload)
  return {
    type: "FILTER_BY_CATEGORIES",
    payload,
  };
};

export const filterByColor = (payload) => {
  return {
    type: "FILTER_BY_COLOR",
    payload,
  };
};
export const filterByPrice = (payload) => {
  console.log(payload)
  console.log(payload)
  console.log(payload)
  return {
    type: "FILTER_BY_PRICE",
    payload,
  };
};

export const filterByGender = (payload) => {
  return {
    type: "FILTER_BY_GENDER",
    payload,
  };
};
export const filterBySize = (payload) => {
  console.log(payload)
  return {
    type: "FILTER_BY_SIZE",
    payload,
  };
};
export const orderByFn = (payload) => {
  console.log(payload)
  return {
    type: "ORDER_BY_FN",
    payload,
  };
};


export function searchBar(keyword) {
  return async function (dispatch) {
    try {
      await axios.get(`/products?search=${keyword}`).then((yeison) => {
        //  console.log(yeison.data)
        dispatch({
          type: "SEARCH_BAR",
          payload: yeison.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getCategories() {
  return async function (dispatch) {
    try {
      await axios.get(`/categories`).then((yeison) => {
        // console.log(yeison.data)
        dispatch({
          type: "GET_CATEGORIES",
          payload: yeison.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getColors() {
  return async function (dispatch) {
    try {
      await axios.get(`/colors`).then((yeison) => {
        // console.log(yeison.data)
        dispatch({
          type: "GET_COLORS",
          payload: yeison.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getReviews() {
  return async function (dispatch) {
    try {
      await axios.get(`/reviews`).then((yeison) => {
        // console.log(yeison.data)
        dispatch({
          type: "GET_REVIEWS",
          payload: yeison.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getReviewsById(payload) {
  return async function (dispatch) {
    try {
      // await axios.get(`/reviews/${id}`).then((yeison) => {
      //   // console.log(yeison.data)
      await axios.get(`/reviews/product/${payload}`).then((yeison) => {
        dispatch({
          type: "GET_REVIEWS_BY_ID",
          payload: yeison.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function setReviews(payload) {
  return async function (dispatch) {
    try {
      // await axios.post(`/reviews/${id}`, review).then((yeison) => {
      //   // console.log(yeison.data)
      await axios.post(`/reviews`, payload).then((yeison) => {
        dispatch({
          type: "POST_REVIEWS",
          payload: yeison.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postProduct(payload) {
  return async function (dispatch) {
    try {
      console.log(payload, "postttttttttt");
      var yeison = await axios.post("/products", payload);
      return yeison;
    } catch (error) {
      console.log(error);
      console.log(yeison);
    }
  };
}

export function editProduct(payload) {
  return async function (dispatch) {
    try {
      console.log(payload, "ante del put");
      var yeison = await axios.put("/products", payload);
      return yeison;
    } catch (error) {
      console.log(error);
      console.log(yeison);
    }
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/products/${id}`);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      console.log(json.data);
    }
  };
}

export const quantityCar = (id, quantity) => {
  return {
    type: "QUANTITY_CAR",
  };
};

// ----------- ACTIONS FOR SIZES  -----------
// Adding by ELIECER
// DateTime: 2022-06-04 13:00
// ------------------------------------------
export function getSizes() {
  return async function (dispatch) {
    try {
      await axios.get(`/sizes`).then((sizes) => {
        dispatch({ type: GET_SIZES, payload: sizes.data });
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getSizesById(id) {
  return async function (dispatch) {
    try {
      await axios.get(`/sizes/${id}`).then((size) => {
        dispatch({
          type: GET_SIZES_BY_ID,
          payload: size.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// ----------- ACTIONS FOR AUTH0 MANAGEMENT API AUTHORIZATION  -----------
// Adding by IVAN MONZON
// DateTime: 2022-06-07
// -----------------------------------------------------------------------

export const getApiJWT = (token) => {
  return new Promise((resolve, reject) => {
    try {
      let options = {
        method: "GET",
        url: "/auth",
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      axios.request(options).then((res) => {
        resolve(res.data);
      });
    } catch (err) {
      console.log(">> ERROR");
      reject(err);
    }
  });
};

export const getUsers = (apiToken) => {
  return new Promise((resolve, reject) => {
    let options = {
      method: "GET",
      url: `/users`,
      headers: {
        authorization: `Bearer ${apiToken}`,
      },
    };

    axios
      .request(options)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getUser = (userId, apiToken) => {
  return new Promise((resolve, reject) => {
    let options = {
      method: "GET",
      url: `/users/${userId}`,
      headers: {
        authorization: `Bearer ${apiToken}`,
      },
    };

    axios
      .request(options)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// getUserRoles devuelve un array de objetos. Cada objeto es un ROL asignado al USER
export const getUserRoles = async (id, apiToken) => {
  try {
    let options = {
      method: "GET",
      url: `/users/roles/${id}`,
      headers: {
        authorization: `Bearer ${apiToken}`,
      },
    };

    const { data } = await axios.request(options);
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const setAdmin = async (userId, roles, apiToken) => {
  console.log(roles);
  try {
    let options = {
      method: "POST",
      url: `/users/setAdmin/${userId}`,
      headers: {
        authorization: `Bearer ${apiToken}`,
      },
      data: roles,
    };

    const { data } = await axios.request(options);
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const revokeAdmin = async (userId, roles, apiToken) => {
  console.log(roles);
  try {
    let options = {
      method: "DELETE",
      url: `/users/revokeAdmin/${userId}`,
      headers: {
        authorization: `Bearer ${apiToken}`,
      },
      data: roles,
    };

    const { data } = await axios.request(options);
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const deleteUser = async (id, apiToken) => {
  // Se hace un delete a users, enviando un email y solicitando la ruta users/deleteUser, esto ejecutará del lado del BACK
  // la solicitud a la API Auth0 para la eliminación del usuario. La consulta devuelve el objeto de usuario.
  try {
    let options = {
      method: "DELETE",
      url: `/users/${id}`,
      headers: {
        authorization: `Bearer ${apiToken}`,
      },
    };
    const { data } = await axios.request(options);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const resetUserPass = async (email, apiToken) => {
  // Se hace un post a users, enviando un email y solicitando la ruta users/resetPass, esto ejecutará del lado del BACK
  // la solicitud a la API Auth0 para el forzado de reset de constraseña. La consulta devuelve el objeto de usuario.
  try {
    let options = {
      method: "POST",
      url: `/users/resetPass/${email}`,
      headers: {
        authorization: `Bearer ${apiToken}`,
      },
    };

    const backRes = await axios.request(options);
    return backRes.data;
  } 
  catch (err) {
    console.log(err)
    throw new Error(err)
  }
};

// ------------------------------------------------------------------------------------------

/* export const otroFilterMas = (payload) => {
  console.log(payload);
  return {
    type: "OTRO_MAS",
    payload,
  };
}; */

// -------------------------------------------------------------------------------------------

// ----------- ACTIONS FOR PRODUCT STOCK  -----------
// Adding by ELIECER
// DateTime: 2022-06-04 13:00
// --------------------------------------------------
export function getStockByProductId(id) {
  return async function (dispatch) {
    try {
      await axios.get(`/stock/product/${id}`).then((stock) => {
        dispatch({
          type: GET_STOCK_BY_PRODUCTID,
          payload: stock.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postStock(payload) {
  return async function (dispatch) {
    try {
      await axios.post(`/stock`, payload).then((stock) => {
        dispatch({
          type: POST_STOCK,
          payload: stock.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
}
/* export function getSizes (){ 
    return async function (dispatch){
        try{
            await axios.get(`/sizes`)
                .then(yeison => {
                    // console.log(yeison.data)
                dispatch({
                type: 'GET_SIZES',
                payload :yeison.data
                })
            })
        }catch(error){
            console.log(error)}
    }
} */

export function putStock(payload) {
  return async function (dispatch) {
    try {
      await axios.put(`/stock/${payload.id}`, payload).then((stock) => {
        dispatch({
          type: PUT_STOCK,
          payload: stock.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteStock(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`/stock/${id}`).then((stock) => {
        dispatch({
          type: DELETE_STOCK,
          payload: stock.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// ------------------------------------------------------
// CHECKOUT
// ------------------------------------------------------

export async function postCheckoutOrder(order, apiToken) {
  try {
    let options = {
      method: "POST",
      url: `/checkout/postOrder`,
      headers: {
        authorization: `Bearer ${apiToken}`,
      },
      data: order,
    };

    const preferenceSandBox = await axios.request(options);
    return preferenceSandBox;
  }
  catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

export async function completeCheckoutOrder( orderId, apiToken ) {
  try {
    let options = {
      method: "POST",
      url: `/checkout/completeOrder`,
      headers: {
        authorization: `Bearer ${apiToken}`,
      },
      data: { orderId: orderId },
    };

    const orderCompleted = await axios.request(options);
    return orderCompleted;
  }
  catch (err) {
    console.log(err)
    throw new Error(err)
  }
};

// ----------- ACTIONS FOR ORDERS  -----------
// Adding by ELIECER
// DateTime: 2022-06-11 00:22:00
// ------------------------------------------
export function getOrders() {
  return async function (dispatch) {
    try {
      await axios.get(`/orders`).then((orders) => {
        dispatch({ type: GET_ORDERS, payload: orders.data });
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getOrdersById(id) {
  return async function (dispatch) {
    try {
      await axios.get(`/orders/${id}`).then((orders) => {
        dispatch({
          type: GET_ORDERS_BY_ID,
          payload: orders.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getOrdersByCustomerId(id) {
  return async function (dispatch) {
    try {
      await axios.get(`/orders/customer/${id}`).then((orders) => {
        // console.log(orders)
        dispatch({
          type: GET_ORDERS_BY_CUSTOMER_ID,
          payload: orders.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postOrders(payload) {
  return async function (dispatch) {
    try {
      await axios.post(`/orders`, payload).then((orders) => {
        dispatch({
          type: POST_ORDERS,
          payload: orders.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function putOrders(payload) {
  return async function (dispatch) {
    try {
      await axios.put(`/orders/${payload.id}`, payload).then((orders) => {
        dispatch({
          type: PUT_ORDERS,
          payload: orders.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// ----------- ACTIONS FOR ORDERDETAILS  -----------
// Adding by ELIECER
// DateTime: 2022-06-11 02:11:00
// ------------------------------------------
export function getOrderDetails() {
  return async function (dispatch) {
    try {
      await axios.get(`/orderDetails`).then((orderDetails) => {
        dispatch({ type: GET_ORDER_DETAILS, payload: orderDetails.data });
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getOrderDetailsById(id) {
  return async function (dispatch) {
    try {
      await axios.get(`/orderDetails/${id}`).then((orderDetails) => {
        dispatch({
          type: GET_ORDER_DETAILS_BY_ID,
          payload: orderDetails.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getOrderDetailsByOrderId(id) {
  return async function (dispatch) {
    try {
      await axios.get(`/orderDetails/order/${id}`).then((orderDetails) => {
        dispatch({
          type: GET_ORDER_DETAILS_BY_ORDER_ID,
          payload: orderDetails.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postOrderDetails(payload) {
  return async function (dispatch) {
    try {
      await axios.post(`/orderDetails`, payload).then((orderDetails) => {
        dispatch({
          type: POST_ORDER_DETAILS,
          payload: orderDetails.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
}
