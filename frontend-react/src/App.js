//import logo from './logo.svg';
import './App.css';
//import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import WishList from "./pages/WishList";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import AddProduct from "./pages/AddProduct";
import Order from "./pages/Order";
import Modify from "./pages/Modify";


function App() {

  /*
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <aS
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  */
  return(
    <div>
      <Router>
      <Navbar/>
        <Routes>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />}/>
            <Route path="register" element={<Register />}/>
            <Route path="wishlist" element={<WishList/>} />
            <Route path="products" element={<Products/>} />
            <Route path="cart" element={<Cart/>} />
            <Route path="addproduct" element={<AddProduct/>} />
            <Route path="order" element={<Order/>} />
            <Route path="modify" element={<Modify/>} />
        </Routes>
     <Footer/>
    </Router>
    </div>
    
  );
}

export default App;
