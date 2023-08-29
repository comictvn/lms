/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import clsx from 'clsx';

import styles from './index.module.css';

export interface PaginationProps {
  current?: number;
  total?: number;
  pageSize?: number;
  style?: React.CSSProperties;
  onChange: (page: number, page_size: number) => void;
}
const Pagination: React.FC<PaginationProps> = ({
  current = 1,
  total = 0,
  pageSize = 0,
  onChange,
  style,
}) => {
  const totalPages = Math.ceil(total / pageSize) || 0;

  const handleClick =
    (page: number, _per: number = pageSize) =>
    () => {
      onChange(page, _per);
    };

  const handlePreviousClick = handleClick(current - 1, pageSize);
  const handleNextClick = handleClick(current + 1, pageSize);
  const handlePageSizeChange = (e) => {
    const newPageSize = Number(e.target.dataset.value);
    onChange(current, newPageSize);
  };

  const isFirstPage = current === 1;
  const isLastPage = current === totalPages;

  const generatePages = () => {
    const MAX_PAGES_TO_SHOW = 5;

    const getPageItem = (index: number) => (
      <li
        key={index}
        className={`${styles.page_item} ${index === current ? styles.active : ''}`}
        onClick={handleClick(index)}
      >
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a rel="nofollow" className={styles.page_link}>
          {index}
        </a>
      </li>
    );

    const getEllipsisItem = (key: string) => (
      <li key={key} className={`${styles.page_item} ${styles.disabled} ${styles.ellipsis}`}>
        <span className={clsx(styles.page_link)}>...</span>
      </li>
    );

    const pageArray = [];

    if (totalPages <= MAX_PAGES_TO_SHOW) {
      for (let index = 1; index <= totalPages; index += 1) {
        pageArray.push(getPageItem(index));
      }
    } else {
      const startPage = Math.max(1, current - Math.floor(MAX_PAGES_TO_SHOW / 2));
      const endPage = Math.min(totalPages, startPage + MAX_PAGES_TO_SHOW - 1);

      if (startPage > 1) {
        pageArray.push(getEllipsisItem('page-start-ellipsis'));
      }

      for (let index = startPage; index <= endPage; index += 1) {
        pageArray.push(getPageItem(index));
      }

      if (endPage < totalPages) {
        pageArray.push(getEllipsisItem('page-end-ellipsis'), getPageItem(totalPages));
      }
    }

    return pageArray;
  };

  return (
    <ul className={styles.pagination} style={style}>
      <li className={`${styles.page_item}`}>
        <button
          className={clsx(styles.page_link, isFirstPage ? styles.disabled : '')}
          onClick={handlePreviousClick}
        >
          <span className={styles.arrow_left} />
        </button>
      </li>
      {generatePages()}
      <li className={`${styles.page_item}`}>
        <button
          className={`${styles.page_link} ${isLastPage ? styles.disabled : ''}`}
          onClick={handleNextClick}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleNextClick();
            }
          }}
        >
          <span className={styles.arrow_right} />
        </button>
      </li>
      <li className={`${styles.page_item}`}>
        <div className={clsx(styles.select_wrapper)}>
          <div className={clsx(styles.select)}>
            <div className={clsx(styles.selected_value)}>{pageSize} / page</div>
            <div className={clsx(styles.dropdown_icon)} />
          </div>
          <ul className={clsx(styles.options, 'options')}>
            <li className={clsx(styles.option)} data-value="10" onClick={handlePageSizeChange}>
              10 / page
            </li>
            <li className={clsx(styles.option)} data-value="25" onClick={handlePageSizeChange}>
              25 / page
            </li>
            <li className={clsx(styles.option)} data-value="50" onClick={handlePageSizeChange}>
              50 / page
            </li>
            <li className={clsx(styles.option)} data-value="100" onClick={handlePageSizeChange}>
              100 / page
            </li>
          </ul>
        </div>
      </li>
    </ul>
  );
};

export { Pagination };
