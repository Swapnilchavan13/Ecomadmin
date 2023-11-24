import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Adminsidepage } from './component/Adminsidepage';
import { Allproducts } from './component/Allproducts';
import { Navbar } from './component/Navbar';
import { Order } from './component/Order';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Allproducts />} />
        <Route path="admin" element={<Adminsidepage />} />
        <Route path="orders" element={<Order />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
