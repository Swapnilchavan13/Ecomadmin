import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Adminsidepage } from './component/Adminsidepage';
import { Allproducts } from './component/Allproducts';
import { Navbar } from './component/Navbar';
import { Order } from './component/Order';
import { AllUsers } from './component/AllUsers';
import { Allmerchants } from './component/Allmerchants';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Allproducts />} />
        <Route path="admin" element={<Adminsidepage />} />
        <Route path="orders" element={<Order />} />
        <Route path="users" element={<AllUsers />} />
        <Route path="merchant" element={<Allmerchants />} />

      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
