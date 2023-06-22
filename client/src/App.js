import { Route, Routes} from 'react-router-dom';

import Tapa from './Pages/Tapa/Tapa';
import Home from './Pages/Home/Home';

import './App.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Tapa />} />
          <Route path="/videogames" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
