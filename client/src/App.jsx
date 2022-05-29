
import { Provider } from 'react-redux';           //es para leer la tineda 
import generateStore from './store';
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from './components/Home';
import Login from './components/Login';
import Shop from './components/Shop';
import Detail from './components/Detail';
import Favorites from './components/Favorites';
import Register from './components/Register';
import Checkout from './components/Checkout';
import SearchResult from './components/SearchResult';
import ShoppingCar from './components/ShoppingCar';
import Footer from './components/Footer';

function App() {
 
  const store = generateStore()
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
        <Route exact path="/shop/details/:id" element={<Detail/>}/>
        <Route exact path="/search/:keyword" element={<SearchResult/>}/>
      </Routes>
      <Footer/> 
    </Provider>
    
  );
}
export default App;
