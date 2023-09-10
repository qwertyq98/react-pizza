import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';
import React from 'react';

type PaginationProps = {
  onChangePage: (page: number) => void;
  pageCount: number;
};

export const Pagination: React.FC<PaginationProps> = ({onChangePage, pageCount}) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={pageCount-1}
    />
  )
}

export default Pagination;