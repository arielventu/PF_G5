const {
  Product,
  Category,
  Colors,
  Sizes,
  Stock,
  Review,
  Customers,
  Orders,
  Orderdetails,
} = require("../db");
const items = require("../../bin/products");
const reviews = require("../../bin/reviews");
const customers = require("../../bin/customers");
const orders = require("../../bin/orders");
const orderDetails = require("../../bin/orderDetails");

// funcion para hacer querys: por id busca por PK y por name busca por findOne
const getFromDB = async (table, param, value) => {
  // let { param, value } = query;
  let where = {
    [param]: value,
  };
  let res = null;
  if (param === "id") {
    res = await table.findByPk({ where });
  }
  if (param === "name") {
    res = await table.findOne({ where });
  }
  return res;
};

// ----------------------------------------------------------------------------------
// PROMESA: Upload de PRODUCTOS a la base de datos
// ----------------------------------------------------------------------------------
const promisifiedPostProducts = () => {
  return new Promise(async (resolve, reject) => {
    const newData = [];
    items.forEach((element) => {
      let imgs = element.images.map((img) => `http:${img.src}`);
      let desc = element.description.substring(3);
      const data = {
        name: element.handle,
        masterName: element.masterName,
        fullName: element.fullName,
        gender: element.gender,
        detail: desc.substring(0, desc.length - 4),
        price: element.price,
        imagecover: element.featuredImage.src,
        imageurl: imgs,
        colors: element.colors,
        available: true,
      };
      newData.push(data);
    });
    const count = await Product.count();
    if (count === 0) {
      try {
        const newType = await Product.bulkCreate(newData);
        resolve(newType);
      } catch (error) {
        reject(error);
      }
    } else {
      resolve(null);
    }
  });
};

// ----------------------------------------------------------------------------------
// PROMESA: Upload de CATEGORIAS a la base de datos
// ----------------------------------------------------------------------------------
const promisifiedPostCategories = () => {
  return new Promise(async (resolve, reject) => {
    let newData = [];
    items.forEach((element) => {
      element.bestFor.forEach((category) => {
        if (!newData.includes(category)) {
          newData.push(category);
        }
      });
    });
    newData = newData.map((elem) => {
      return { name: elem };
    });
    try {
      const newType = await Category.bulkCreate(newData);
      resolve(newType);
    } catch (error) {
      reject(error);
    }
  });
};

// ----------------------------------------------------------------------------------
// PROMESA: Generacion de relaciones entre productos y categorias segun JSONs
// ----------------------------------------------------------------------------------
const promisifiedRelCatProd = () => {
  return new Promise((resolve, reject) => {
    try {
      items.forEach(async (element) => {
        const productDB = await getFromDB(Product, "name", element.handle);
        element.bestFor.forEach(async (category) => {
          try {
            const categoryDB = await getFromDB(Category, "name", category);
            await productDB.setCategories(categoryDB);
          } catch (error) {
            throw new Error(error);
          }
        });
      });
      resolve("Products - Categories Relations Created");
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

// ----------------------------------------------------------------------------------
// PROMESA: Upload de COLORS a la base de datos
// ----------------------------------------------------------------------------------
const promisifiedPostColors = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const newData = [];
      items.forEach((element) => {
        element.hues.forEach((hues) => {
          if (!newData.includes(hues)) {
            newData.push(hues);
          }
        });
      });
      const colorObjArray = newData.map((color) => ({ color: color }));
      // console.log(colorObjArray);
      const colorCreated = await Colors.bulkCreate(colorObjArray);
      resolve("colors correctly created");
    } catch (err) {
      reject(err);
    }
  });
};

// ----------------------------------------------------------------------------------
// PROMESA: Upload de SIZES a la base de datos
// ----------------------------------------------------------------------------------
const promisifiedPostSizes = () => {
  return new Promise(async (resolve, reject) => {
    let newData = [];
    items.forEach((element) => {
      element.sizesSortOrder.forEach((size) => {
        if (!newData.includes(size)) {
          newData.push(size);
        }
      });
    });
    newData = newData.map((elem) => {
      return { size: elem };
    });
    try {
      const newType = await Sizes.bulkCreate(newData);
      resolve(newType);
    } catch (error) {
      reject(error);
    }
  });
};

// ----------------------------------------------------------------------------------
// PROMESA: Upload de STOCK a la base de datos, aca se arman las relaciones en STOCK
// ----------------------------------------------------------------------------------
const promisifiedPostStock = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let stockReg = {
        quantity: 1000,
        available: true,
      };
      items.forEach(async (prod) => {
        const prodIdQuery = await Product.findAll({
          where: {
            name: prod.handle,
          },
        });
        if (prodIdQuery !== null) {
          // console.log(prodIdQuery[0].dataValues.id)
          const prodId = prodIdQuery[0].dataValues.id;
          for (let size in prod.sizes) {
            const sizeIdQuery = await Sizes.findAll({
              where: {
                size: size,
              },
            });
            if (sizeIdQuery !== null) {
              // console.log(sizeIdQuery[0].dataValues.id);
              const sizeId = sizeIdQuery[0].dataValues.id;
              prod.hues.forEach(async (color) => {
                const colorIdQuery = await Colors.findAll({
                  where: {
                    color: color,
                  },
                });
                if (colorIdQuery !== null) {
                  if (colorIdQuery.length > 0) {
                    const colorId = colorIdQuery[0].dataValues.id;

                    try {
                      const newStock = await Stock.create({
                        ...stockReg,
                        productId: prodId,
                        sizeId: sizeId,
                        colorId: colorId,
                      });
                    } catch (err) {
                      throw new Error(err);
                    }
                  }
                } else console.log("hue not found");
              });
            } else console.log("size not found");
          }
        } else console.log("product not found");
      });
      resolve("Stock table created");
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

// ----------------------------------------------------------------------------------
// PROMESA: Upload de CUSTOMERS a la base de datos
// ----------------------------------------------------------------------------------
const promisifiedPostCustomers = () => {
  return new Promise(async (resolve, reject) => {
    const newData = [];
    customers.forEach((element) => {
      const data = {
        id: element.id,
        fullName: element.fullName,
        billingAddress: element.billingAddress,
        defaultShippingAddress: element.defaultShippingAddress,
        country: element.country,
        phone: element.phone,
        userType: element.userType,
      };
      newData.push(data);
    });
    const count = await Customers.count();
    if (count === 0) {
      try {
        const newType = await Customers.bulkCreate(newData);
        resolve(newType);
      } catch (error) {
        reject(error);
      }
    } else {
      resolve(null);
    }
  });
};

// ----------------------------------------------------------------------------------
// PROMESA: Upload de REVIEWS a la base de datos
// ----------------------------------------------------------------------------------
const promisifiedPostReviews = () => {
  return new Promise(async (resolve, reject) => {
    const newData = [];
    reviews.forEach((element) => {
      const data = {
        description: element.description,
        starsLevel: element.starsLevel,
        productId: element.productId,
      };
      newData.push(data);
    });
    const count = await Review.count();
    if (count === 0) {
      try {
        const newType = await Review.bulkCreate(newData);
        //resolve(newType);
        resolve("Review table created");
      } catch (error) {
        reject(error);
      }
    } else {
      resolve(null);
    }
  });
};

// ----------------------------------------------------------------------------------
// PROMESA: Upload de ORDERS a la base de datos
// ----------------------------------------------------------------------------------
const promisifiedPostOrders = () => {
  return new Promise(async (resolve, reject) => {
    const newData = [];
    orders.forEach((element) => {
      const data = {
        orderDate: element.orderDate,
        amount: element.amount,
        shippingAddress: element.shippingAddress,
        orderEmail: element.orderEmail,
        orderStatus: element.orderStatus,
        customerId: element.customerId,
      };
      newData.push(data);
    });
    const count = await Orders.count();
    if (count === 0) {
      try {
        const newType = await Orders.bulkCreate(newData, { returning: true });
        resolve("Orders table created");
      } catch (error) {
        reject(error);
      }
    } else {
      resolve(null);
    }
  });
};

// ----------------------------------------------------------------------------------
// PROMESA: Upload de ORDERDETAILS a la base de datos
// ----------------------------------------------------------------------------------
const promisifiedPostOrderDetails = () => {
  return new Promise(async (resolve, reject) => {
    const newData = [];
    orderDetails.forEach((element) => {
      const data = {
        price: element.price,
        quantity: element.quantity,
        productUrl: element.productUrl,
        ordersId: element.ordersId,
        productId: element.productId,
      };
      newData.push(data);
    });
    const count = await Orderdetails.count();
    if (count === 0) {
      try {
        const newType = await Orderdetails.bulkCreate(newData, {
          returning: true,
        });
        resolve("Order Details table created");
      } catch (error) {
        reject(error);
      }
    } else {
      resolve(null);
    }
  });
};

// ----------------------------------------------------------------------------------
// CONTROLADOR: Ejecuta las promesas de carga de products, categories, colors,
// sizes y reviews a las base de datos.
// ----------------------------------------------------------------------------------
const postDBData = async (req, res) => {
  let products = promisifiedPostProducts();
  let categories = promisifiedPostCategories();
  let colors = promisifiedPostColors();
  let sizes = promisifiedPostSizes();
  let customers = promisifiedPostCustomers();

  Promise.all([products, categories, colors, sizes, customers])
    .then((data) => {
      promisifiedPostReviews()
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    })
    .then((data) => {
      promisifiedRelCatProd()
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    })
    .then((data) => {
      promisifiedPostStock()
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    })
    .then((data) => {
      promisifiedPostOrders()
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    })
    .then((data) => {
      promisifiedPostOrderDetails()
        .then((data) => {
          console.log("Database information has been successfully uploaded!");
          console.log("Server is ready to work");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

module.exports = {
  postDBData,
};
