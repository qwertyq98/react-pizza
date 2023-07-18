import React from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import Categories from './Categories';
import Sort from './Sort';
import PizzaBlock from './PizzaBlock';
import api from '../api/api';
import Sceleton from './Sceleton';
import Pagination from './Pagination/Pagination';
import { SearchContext } from './App';
import { setCategoryId, setPageCount } from '../redux/slices/filterSlice';

function Home() {
  const { categoryId, sort, pageCount } = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const {searchValue} = React.useContext(SearchContext);

  function onClickCategory(id) {
    dispatch(setCategoryId(id));
  }

  function onChangePage(number) {
    dispatch(setPageCount(number));
  }

  React.useEffect(() => {
    setIsLoading(true);
    api
      .getPizzas(categoryId, sort.sortProperty, searchValue, pageCount)
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
  }, [categoryId, sort, searchValue, pageCount]);

  const elements = pizzas.map((obj, index) => <PizzaBlock key={index} {...obj} />);
  const scelenons = [...new Array(10)].map((_, index) => <Sceleton key={index} />);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories categoryId={categoryId} onClickCategory={onClickCategory} />
          <Sort  />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? scelenons
            : elements}
        </div>
        <Pagination pageCount={pageCount} onChangePage={onChangePage}/>
      </div>
    </>
  );
}

export default Home;
