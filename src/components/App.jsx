import { Route, Routes } from 'react-router-dom';
import '../scss/app.scss';
import Header from './Header';
import Home from './Home';
import Cart from './Cart/Cart';
import NotFound from './NotFound/NotFound';
import React from 'react';

export const SearchContext = React.createContext('');

function App() {
  const [searchValue, setSearchValue] = React.useState('');

  function handlerSearchChange(value) {
    setSearchValue(value);
  }

  return (
    <>
      <div className="wrapper">
        <SearchContext.Provider value={{searchValue, handlerSearchChange}}>
          <Header />
          <div className="content">
            <Routes>
              <Route path="" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          </SearchContext.Provider>
      </div>
    </>
  );
}

export default App;
