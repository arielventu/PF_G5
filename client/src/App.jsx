import { Provider } from "react-redux"; //es para leer la tineda
import generateStore from "./store";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Shop from "./components/Shop";
import Detail from "./components/Detail";
import Favorites from "./components/Favorites";
import Register from "./components/Register";
import Reviews from "./components/Reviews";
import SearchResult from "./components/SearchResult";
import ShoppingCar from "./components/ShoppingCar";
import Footer from "./components/Footer";
import UserProfile from "./components/UserProfile";
import Products from "./components/Products";


function App() {
  const store = generateStore();
  return (
    <Provider store={store}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shoppingCar" element={<ShoppingCar />} />
        <Route path="/products" element={<Products />} />
        <Route exact path="/shop/details/:id" element={<Detail />} />
        <Route exact path="/search/:keyword" element={<SearchResult />} />
        <Route exact path="/user-profile" element={<UserProfile />} />
        <Route exact path="/reviews" element={<Reviews />} />
      </Routes>
      <Footer />
    </Provider>
  );
}
export default App;
