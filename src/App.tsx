import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './modules/common/components/NavBar';
import Recomendations from './modules/store/components/recomendations/Recomendations';
import Footer from './modules/common/components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OrderForm from './modules/store/components/order/OrderForm';


function App() {

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Recomendations />} />
          <Route path="/order" element={<OrderForm />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
