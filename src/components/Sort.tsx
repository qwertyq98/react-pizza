import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SortPropertyEnum, SortType, selectSort, setSort } from '../redux/slices/filterSlice';

export type SortItemOption = {
  name: string;
  sortProperty: string;
};

type SortProps = {
  list: SortType;
};

export const sortList: SortItemOption[] = [
  { name: 'популярности (DESC)', sortProperty: SortPropertyEnum.RATING_DESC },
  { name: 'популярности (ASK)', sortProperty: SortPropertyEnum.RATING_ASK },
  { name: 'цене (DESC)', sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: 'цене (ASK)', sortProperty: SortPropertyEnum.PRICE_ASK },
  { name: 'алфавиту (DESC)', sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: 'алфавиту (ASK)', sortProperty: SortPropertyEnum.TITLE_ASK },
];

const Sort: React.FC<SortProps> = React.memo(({list}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const sortRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const haldleClickOutside = (event: MouseEvent) => {
      // добавляю MouseEvent свойство path
      const _event = event as MouseEvent & {
        path: Node[];
      }

      if(_event.path) {
        if(sortRef.current && !_event.path.includes(sortRef.current)) {
          setOpen(false);
        }
      }
    }

    open && document.body.addEventListener('click', haldleClickOutside);

    return(() => {
      open && document.body.removeEventListener('click', haldleClickOutside);
    })
  }, [open])

  function selectCategory(obj:SortType) {
    dispatch(setSort(obj));
    setOpen(false);
  }

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{list.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, i) => (
              <li
                key={i}
                className={list.sortProperty === obj.sortProperty ? 'active' : ''}
                onClick={() => selectCategory(obj)}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
})

export default Sort;
