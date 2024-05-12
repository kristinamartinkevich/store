import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './modules/common/components/NavBar';
import Recomendations from './modules/store/components/recomendations/Recomendations';

function App() {

  return (
    <>
      <NavBar />
      <Recomendations />
    </>
  );
}

export default App;