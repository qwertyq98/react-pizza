import React from 'react';
import Categories from './Categories';
import Sort from './Sort';
import PizzaBlock from './PizzaBlock';
import api from '../api/api';
import Sceleton from './Sceleton';
import Pagination from './Pagination/Pagination';
import { SearchContext } from './App';

function Home() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedSort, setSelectedSort] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
  });
  const [categoryId, setCategoryId] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const {searchValue} = React.useContext(SearchContext);

  React.useEffect(() => {
    setIsLoading(true);
    api
      .getPizzas(categoryId, selectedSort.sortProperty, searchValue, currentPage)
      .then((pizzas) => {
        setPizzas(pizzas);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, selectedSort, searchValue, currentPage]);

  const elements = pizzas.map((obj, index) => <PizzaBlock key={index} {...obj} />);
  const scelenons = [...new Array(10)].map((_, index) => <Sceleton key={index} />);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories categoryId={categoryId} onClickCategory={(id) => setCategoryId(id)} />
          <Sort selectedSort={selectedSort} onClickSort={(i) => setSelectedSort(i)} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? scelenons
            : elements}
        </div>
        <Pagination onChangePage={(number) => setCurrentPage(number)}/>
      </div>
    </>
  );
}

export default Home;
