
import { Provider } from 'react-redux';           //es para leer la tineda 
import generateStore from './store';
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from './components/Home';
import Login from './components/Login';
import Shop from './components/Shop';
import Detail from './components/Detail';
import Favoritos from './components/Favoritos';
import Register from './components/Register';
import Checkout from './components/Checkout';

function App() {
 
  const store = generateStore()
  return (
    <Provider store={store}>   
      <Navbar />
      <Routes> 
        <Route path="/" element={<Home />} />   
        <Route path="/shop" element={<Shop />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route exact path="/shop/details/:id" element={<Detail/>}/>
      </Routes> 
    </Provider>
    
  );
}
export default App;
