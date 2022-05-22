
import { Provider } from 'react-redux';           //es para leer la tineda 
import generateStore from './store';
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Shop from './components/Shop';
import Detail from './components/Detail';

function App() {
 
  const store = generateStore()
  return (
    <Provider store={store}>   
      <Navbar />
      <Routes> 
        <Route path="/" element={<Home />} />   
        <Route path="/shop" element={<Shop />} />
        <Route exact path="/shop/details/:id" element={<Detail/>}/>
      </Routes> 
    </Provider>
    
  );
}
export default App;
