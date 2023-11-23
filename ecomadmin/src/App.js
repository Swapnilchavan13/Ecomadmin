import './App.css';
import { Adminsidepage } from './component/Adminsidepage';
import { Allproducts } from './component/Allproducts';
import { Navbar } from './component/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
     <Adminsidepage />
     <Allproducts />
    </div>
  );
}

export default App;
