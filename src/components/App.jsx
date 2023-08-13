import { Route, Routes } from 'react-router-dom';
import '../scss/app.scss';
import Header from './Header';
import Home from './Home';
import Cart from './Cart/Cart';
import NotFound from './NotFound/NotFound';


function App() {

  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
