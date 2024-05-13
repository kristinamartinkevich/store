import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './modules/common/components/NavBar';
import Recomendations from './modules/store/components/recomendations/Recomendations';
import Footer from './modules/common/components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cart from './modules/store/components/cart/Cart';


function App() {

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Recomendations />} />
          <Route path="/order" element={<Cart />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
