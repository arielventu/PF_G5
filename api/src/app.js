// EXPRESS & OTHERS dependencies -------------------------------------
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require('cors');

// ROUTES ------------------------------------------------------------
const productsRoutes = require("./routes/products.routes");
const sizesRoutes = require("./routes/sizes.routes");
const colorsRoutes = require("./routes/colors.routes");
const dbDataPushRoutes = require("./routes/db-data-push.routes");
const categoriesRoutes = require("./routes/categories.routes");
const reviewsRoutes = require("./routes/reviews.routes");
const stockRoutes = require("./routes/stock.routes");
const customersRoutes = require("./routes/customers.routes");
const ordersRoutes = require("./routes/orders.routes");
// const orderDetailsRoutes = require("./routes/orderDetails.routes");
const orderDetailsRoutes = require("./routes/orderDetails.routes");
const authRoutes = require("./routes/auth.routes");
const usersRoutes = require("./routes/users.routes")
const checkoutRoutes = require("./routes/checkout.routes")

const mailRouter = require("./routes/mail.routes");
const favoritesRoutes = require("./routes/favorites.routes");
const basketListRoutes = require("./routes/basketList.routes");

// JSON Web Tokens (JWT) dependencies --------------------------------
const { expressjwt: jwt } = require("express-jwt");
const jwks = require("jwks-rsa");

// App constant. Express Server instantiation ------------------------ 
const app = express();
app.use(cors())

// JWT VERIFICATION MIDDLEWARE ---------------------------------------
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://ivocfh.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://ivocfh.us.auth0.com/api/v2/",
  // audience: 'https://www.bluebirds.api.com',
  issuer: "https://ivocfh.us.auth0.com/",
  algorithms: ["RS256"],
});
// -------------------------------------------------------------------

// view engine setup -------------------------------------------------
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// middlewares -------------------------------------------------------
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, ");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
app.use(dbDataPushRoutes);
app.use(productsRoutes);
app.use(sizesRoutes);
app.use(colorsRoutes);
app.use(categoriesRoutes);
app.use(reviewsRoutes);
app.use(stockRoutes);
app.use(customersRoutes);
app.use(ordersRoutes);
app.use(orderDetailsRoutes);
app.use(mailRouter);
app.use(favoritesRoutes);
app.use(basketListRoutes);


// LA PARTE DE AUTORIZACION DEBE VENIR A LO ÚLTIMO 
app.use(jwtCheck);  // Utiliza el jwtCheck para las siguientes rutas
app.use(authRoutes); // Toma el API Token para utilizar en los request a Auth0 Management
app.use(usersRoutes); // Utiliza el token de la API Auth0 Management para hacer consultas a los endpoints de usuarios
app.use(checkoutRoutes); // Integracion con mercadopago

// catch 404 and forward to error handler ---------------------------------------
app.use(function (req, res, next) {
  next(createError(404));
});

// ERROR HANDLER ----------------------------------------------------------------
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});


module.exports = app;
