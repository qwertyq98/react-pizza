import React from 'react';
import { useSelector } from 'react-redux'; 
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import Categories from '../Categories';
import Sort, { SortItemOption, sortList } from '../Sort';
import PizzaBlock from '../PizzaBlock';
import Sceleton from '../Sceleton';
import Pagination from '../Pagination/Pagination';
import { setCategoryId, setPageCount, setFilters } from '../../redux/slices/filter/slice';
import { fetchPizzas } from '../../redux/slices/pizzas/slice';
import { useAppDispatch } from '../../redux/store';
import { selectFilter } from '../../redux/slices/filter/selectors';
import { FilterSliceState, SortType } from '../../redux/slices/filter/types';
import { selectPizzaData } from '../../redux/slices/pizzas/selectors';

const Home:React.FC = () => {
  const { categoryId, sort, pageCount, searchValue } = useSelector(selectFilter);
  const {items, status} = useSelector(selectPizzaData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
 
  const elements = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const scelenons = [...new Array(10)].map((_, index) => <Sceleton key={index} />);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const onClickCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  function onChangePage(number: number) {
    dispatch(setPageCount(number));
  }

  async function getPizzas() {
    dispatch(fetchPizzas({categoryId, sort, searchValue, pageCount}));
  } 

  React.useEffect(() => {
    if (window.location.search) {
      const params =( qs.parse(window.location.search.substring(1)) as unknown) as FilterSliceState;
      const sortParams = sortList.find((obj:SortItemOption) => obj.sortProperty === (params.sort as unknown) as string) as SortType;
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
          <Sort list={sort} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {
          status === 'error' ? 
          <div className='content__error-info'>
            <h2>Произошла ошибка<span>😕</span></h2>
            <p>
              К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.
            </p>
          </div> : 
          <div className="content__items">
            {status === 'loading'
              ? scelenons
              : elements}
          </div>
        }
        <Pagination pageCount={pageCount} onChangePage={onChangePage}/>
      </div>
    </>
  );
}

export default Home;
