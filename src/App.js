import './App.css';
import Nav from './Component/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './Component/footer';
import SignUp from './Component/signUp';
import PrivateComponent from './Component/privateComponent';
import Login from './Component/login';
import AddProduct from './Component/AddProduct';
import ProductList from './Component/productList';
import UpdateProduct from './Component/UpdateProduct';
import Profile from './Component/profile';
function App() {
  return (
    <div className="app-background">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductList />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/logout" element={<h1>Logout Product Component</h1>} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
