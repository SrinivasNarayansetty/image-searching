import React from 'react';
import './index.scss';
import SearchItemsList from '../search-list/index';

const SearchComponent = (props) => {
	return (
		<div className="search-bar-section">
			<h3>Search Photos</h3>
			<div className="search-input-section" onMouseLeave={props.onMouseLeave}> 
			<div className="search-input-div">
				<input value={props.searchInput} className="search-input br3 fs16" placeholder="search item" type="text" onChange={props.handleInput} onKeyDown={props.handleInput} onFocus={props.onInputFocus}></input>
				<button className="close-button" onClick={props.clearSearchInput}>X</button>
			</div>
			<SearchItemsList
				userTyping= {props.userTyping}
				onSearchItemClick={props.onSearchItemClick}
				clearFilters={props.clearFilters}
			></SearchItemsList>
			</div>
			
		</div>
	)
}
export default SearchComponent;