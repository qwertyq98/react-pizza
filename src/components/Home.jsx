import React from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import Categories from './Categories';
import Sort, { sortList } from './Sort';
import PizzaBlock from './PizzaBlock';
import api from '../api/api';
import Sceleton from './Sceleton';
import Pagination from './Pagination/Pagination';
import { SearchContext } from './App';
import { setCategoryId, setPageCount, setFilters } from '../redux/slices/filterSlice';

function Home() {
  const { categoryId, sort, pageCount } = useSelector(state => state.filter);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const {searchValue} = React.useContext(SearchContext);
  const elements = pizzas.map((obj, index) => <PizzaBlock key={index} {...obj} />);
  const scelenons = [...new Array(10)].map((_, index) => <Sceleton key={index} />);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  function onClickCategory(id) {
    dispatch(setCategoryId(id));
  }

  function onChangePage(number) {
    dispatch(setPageCount(number));
  }

  function getPizzas() {
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
  }

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortParams = sortList.find(obj => obj.sortProperty === params.sort);
      dispatch(setFilters({...params, sort: sortParams}));
      isSearch.current = true;
    }

  }, []);

  React.useEffect(() => {
    if(!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [categoryId, sort, searchValue, pageCount]); 

  React.useEffect(() => {
    if(isMounted.current) {
      const queryString = qs.stringify({
        sort: sort.sortProperty,
        categoryId,
        pageCount
      })
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, pageCount]);


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
