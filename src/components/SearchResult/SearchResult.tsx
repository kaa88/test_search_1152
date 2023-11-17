import {
   ComponentProps,
   useEffect,
   ReactNode,
   useState,
   useLayoutEffect,
   MouseEvent,
   useRef
} from 'react';
import classes from './SearchResult.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/typedReduxHooks';
import { updateSearchList } from '../../store/slices/searchSlice';
import { Pagination } from 'react-bootstrap';

const SearchResult = function ({ className = '', ...props }: ComponentProps<'div'>) {
   const dispatch = useAppDispatch();
   useEffect(() => {
      dispatch(updateSearchList(''));
   }, []); // eslint-disable-line react-hooks/exhaustive-deps

   const { isLoading, loadError, list, fragment } = useAppSelector((state) => state.search);

   // Pagination
   const limit = 10;
   const pageCount = Math.ceil(list.length / limit);
   const defaultPage = 1;
   const [activePage, setActivePage] = useState(defaultPage);
   const handlePaginationClick = (e: MouseEvent<HTMLElement>) => {
      const value = e.currentTarget.dataset.value;
      if (!value) return;
      setActivePage(Number(value));
   };
   const items = [];
   for (let number = defaultPage; number <= pageCount; number++) {
      items.push(
         <Pagination.Item
            key={number}
            active={number === activePage}
            data-value={number}
            onClick={handlePaginationClick}
         >
            {number}
         </Pagination.Item>
      );
   }
   useLayoutEffect(() => {
      setActivePage(defaultPage);
   }, [isLoading]);
   // /Pagination

   const getHighlightedText = (str: string) => {
      if (!fragment) return str;
      const split = str.split(fragment);
      const nodes: ReactNode[] = [];
      split.forEach((item, i) => {
         nodes.push(<span key={i}>{item}</span>);
         if (i < split.length - 1)
            nodes.push(
               <span className={classes.highlighted} key={i + '_2'}>
                  {fragment}
               </span>
            );
      });
      return nodes;
   };

   const listCLone = [...list];
   const shortList = listCLone.splice(limit * (activePage - 1), limit);
   const listRef = useRef<HTMLDivElement>(null);

   const normalContent = (
      <div className={classes.list} ref={listRef}>
         {!shortList.length ? (
            <p className={classes.status}>List is empty</p>
         ) : (
            shortList.map((item) => (
               <div className={classes.listItem} key={item.id}>
                  <div className={classes.itemHeader}>
                     <p className={classes.itemId}>#{item.id}</p>
                     <p className={classes.itemTitle}>{getHighlightedText(item.title)}</p>
                  </div>
                  <div className={classes.itemText}>{getHighlightedText(item.body)}</div>
               </div>
            ))
         )}
      </div>
   );
   const loadingContent = <p className={classes.status}>loading</p>;
   const loadErrorContent = <p className={classes.status}>{loadError}</p>;
   let content = normalContent;
   if (isLoading) content = loadingContent;
   else if (loadError !== null) content = loadErrorContent;

   useEffect(() => {
      const listEl = listRef.current;
      if (listEl) listEl.scrollTo({ top: 0 });
   }, [activePage]);

   return (
      <div className={`${className} ${classes.default}`} {...props}>
         <Pagination size="sm">{items}</Pagination>
         {content}
      </div>
   );
};
export default SearchResult;
