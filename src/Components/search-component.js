import React from 'react';
import './search-components.css';
import { isArray } from 'util';


class SearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
            userTyping: false
        }
        this.counter = 1;
        this.handleInput = this.handleInput.bind(this);
        this.showSearchList = this.showSearchList.bind(this);
        this.hideSearchList = this.hideSearchList.bind(this);
        this.debouncing = this.debouncing.bind(this);
        this.makeApiCal = this.makeApiCal.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
        this.getTimeStampValue = this.getTimeStampValue.bind(this);
    }

    getTimeStampValue() {
        this.counter = (this.counter + 1);
        let now = new Date();
        let timestamp = now.getUTCMilliseconds();
        timestamp = now.getFullYear().toString(); // 2011
        timestamp += (now.getMonth < 9 ? '0' : '') + now.getMonth().toString(); // JS months are 0-based, so +1 and pad with 0's
        timestamp += ((now.getDate < 10) ? '0' : '') + now.getDate().toString();
        timestamp +=  this.counter.toString();
        return ('search'+timestamp);
    } 
    hideSearchList() {
        this.setState({userTyping:false})
    }
    
    showSearchList() {
        this.setState({userTyping:true})
    }

    handleInput(e) {
        let val = e.target.value.trim();
        this.setState({searchInput: val,userTyping:true});
        if(val && val !== '') {
          this.debouncing(this.makeApiCal, 1000);
        }
    }

    makeApiCal(fromScrollFlag, inputValue){
        let val;
        if(inputValue) {
          val = inputValue;
        } else {
          val = this.state.searchInput;
        }
    
        let searchList = [];
    
        if(val && val.trim() !== '') {
          this.setState({userTyping:false})
          if(localStorage.getItem('searchInputsList')) {
            searchList = JSON.parse(localStorage.getItem('searchInputsList'));
          }
          if(searchList.indexOf(val) === -1)  {
            if(searchList.length === 5) {
              searchList.splice(0,1);
            }
            searchList.push(val);
          } 
          localStorage.setItem('searchInputsList', JSON.stringify(searchList));
      
      
          let pageNumber = this.page;
          if(!fromScrollFlag) {
            this.props.serchStarted();
          }
          let photoData = this.state.photoData;
      
      
          fetch('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=b0bf8bb928d0ee3aa069f809f9aeca73&tags='+val+'&format=json&nojsoncallback=1&page='+pageNumber)
          .then(function(response){
            return response.json();
          })      
          .then(function(res){
            if(res && res.photos && res.photos.photo && isArray(res.photos.photo)) {
              if(fromScrollFlag) {
                photoData = photoData.concat(res.photos.photo);
              } else {
                photoData = res.photos.photo;
              }
              this.page++;
              this.setState({loading:false,photoData:photoData});
              this.apiCallSent = false;
            }
          }.bind(this))
        }
       
      }

    debouncing(fn, delay) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          fn();
        },delay);
    }

    clearFilters() {
        if(localStorage.getItem('searchInputsList')) {
          let searchInputsList = [];
          localStorage.setItem('searchInputsList',JSON.stringify(searchInputsList));
          this.setState({userTyping:false});
        }
      }
    render() {
        let searchItemsList,clearSearchItems,
            userTyping = this.state.userTyping;

        if(userTyping) {
            if(localStorage.getItem('searchInputsList')) {
              let searchList = JSON.parse(localStorage.getItem('searchInputsList'));
              if(searchList.length > 0) {
                searchItemsList = searchList.map((key) => {
                  return (
                    <li className="serch-list-item" data-value={key} key={this.getTimeStampValue()} onClick={this.changeSearchInput}>
                      {key}
                    </li>)
                });
      
                clearSearchItems = <button className="clear-button" onClick={this.clearFilters}>Clear</button>
              }
            }
          } else {
            searchItemsList = '';
          }
        return(
            <div className="search-bar-section">
              <h3>Search Photos</h3>
              <div className="search-input-section">
                <div className="search-input-div">
                  <input value={this.state.searchInput} className="searchInput" placeholder="search item" type="text" onChange={this.handleInput} onKeyDown={this.handleInput} onFocus={this.showSearchList}></input>
                  <button className="close-button" onClick={this.clearSearchInput}>X</button>
                </div>
                <div className="search-list-section">
					<ul className="search-list">
					{searchItemsList}
					</ul>
					{clearSearchItems}
                </div>
              </div>
          </div>
        )
    }
}

export default SearchComponent;

