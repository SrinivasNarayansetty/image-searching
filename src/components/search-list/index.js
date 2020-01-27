import React from 'react';
import './index.scss';

const SearchItemsList = (props) => {
      let searchItemsList, clearSearchItems;
      if(props.userTyping) {
          if(localStorage.getItem('searchInputsList')) {
            let searchList = JSON.parse(localStorage.getItem('searchInputsList'));
            if(searchList.length > 0) {
              searchItemsList = searchList.map((item,index) => {
                return (
                  <li className="serch-list-item" data-value={item} key={index} onClick={props.onSearchItemClick}>
                    {item}
                  </li>)
              });
              clearSearchItems = <button className="clear-button br3 fs16" onClick={props.clearFilters}>Clear</button>
            }
          }
        } else {
          searchItemsList = '';
        }
      return(
          <div className="search-list-section br5">
              <ul className="search-list">
                {searchItemsList}
            </ul>
            {clearSearchItems}
          </div>
      )
}

export default SearchItemsList