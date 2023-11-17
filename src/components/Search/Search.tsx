import { ComponentProps } from 'react';
import classes from './Search.module.scss';

interface SearchProps extends ComponentProps<'div'> {
   a?: string;
}

const Search = function ({ className = '', children, ...props }: SearchProps) {
   return (
      <div className={`${className} ${classes.default}`} {...props}>
         {children}
      </div>
   );
};
export default Search;
