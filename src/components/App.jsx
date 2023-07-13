// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import '../scss/app.scss';
import React from 'react';
import Header from './Header';
import Categories from './Categories';
import Sort from './Sort';
import PizzaBlock from './PizzaBlock';;
import api from '../api/api';

function App() {
  const [pizzas, setPizzas] = React.useState([]);

  React.useEffect(() => {
    api.getPizzas()
      .then(pizzas => setPizzas(pizzas))
      .catch((err) => {
        console.log(err);
      });
  }, [])

  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {pizzas.map((item, index) => (
                <PizzaBlock
                  key={index}
                  {...item}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
