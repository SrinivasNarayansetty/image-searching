import React from 'react';
import './App.css';
import { isArray } from 'util';
import loader from './images/Loader.gif';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
}; 

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      searchInput: '',
      photoData:[],
      page:1,
      loading: false,
      searchList: [],
      userTyping: false,
      modalIsOpen: false
    }
    this.timer = '';
    this.page = 1;
    this.counter = 1;
    this.apiCallSent = false;
    this.modelPicData = {
      title : '',
      src: ''
    }
    this.getPhotos = this.getPhotos.bind(this);
    this.debouncing = this.debouncing.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.openPhotoModel = this.openPhotoModel.bind(this);
    this.changeSearchInput = this.changeSearchInput.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.hideSearchList = this.hideSearchList.bind(this);
    this.showSearchList = this.showSearchList.bind(this);
    this.clearSearchInput = this.clearSearchInput.bind(this);
  }

  hideSearchList() {
    this.setState({userTyping:false})
  }

  showSearchList() {
    this.setState({userTyping:true})
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  openPhotoModel(e) {
    this.modelPicData.title = e.target.getAttribute('data-title');
    this.modelPicData.src = e.target.src;
    this.setState({modalIsOpen:true})
  }

  closeModal() {
    this.setState({modalIsOpen:false})
    this.modelPicData.title = '';
    this.modelPicData.src = '';
  }

  handleScroll() {
    if((window.innerHeight + window.scrollY+ 300) >= (document.body.offsetHeight-300) && !this.apiCallSent) {
      this.getPhotos(true);
      this.apiCallSent = true;
    }
  }

  startLoading() {
    this.setState({loading:true});
  }

  getPhotos(fromScrollFlag, inputValue){
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
        this.startLoading();
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

  getTimeStampValue() {
    this.counter = (this.counter + 1);
    let now = new Date();
    let timestamp = now.getUTCMilliseconds();
    timestamp = now.getFullYear().toString(); // 2011
    timestamp += (now.getMonth < 9 ? '0' : '') + now.getMonth().toString(); // JS months are 0-based, so +1 and pad with 0's
    timestamp += ((now.getDate < 10) ? '0' : '') + now.getDate().toString();
    timestamp +=  this.counter.toString();
    return ('pic'+timestamp);
  }

  debouncing(fn, delay) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      fn();
    },delay);
  }
  
  handleInput(e) {
    let val = e.target.value.trim();
    this.setState({searchInput: val,userTyping:true});
    if(val && val !== '') {
      this.debouncing(this.getPhotos, 1000);
    }
  }

  changeSearchInput(e) {
    let val = e.target.getAttribute('data-value');
    this.setState({searchInput: val});
    this.getPhotos(false, val) ;
  }

  clearFilters() {
    if(localStorage.getItem('searchInputsList')) {
      let searchInputsList = [];
      localStorage.setItem('searchInputsList',JSON.stringify(searchInputsList));
      this.setState({userTyping:false});
    }
  }

  clearSearchInput() {
    this.setState({searchInput:''})
  }

  render() {
    let picturesData,searchItemsList,clearSearchItems,popUpModel,
        photoData = this.state.photoData,
        userTyping = this.state.userTyping;

    if(this.state.loading) {
      picturesData = <div className="loader-section">
                        <h3>Loading...Please wait</h3>
                        <img alt="loader" className="loader-image" src={loader} />
                    </div>
    } else {
        if(photoData.length > 0) {
          picturesData = photoData.map((pic) => {
            let srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';

            return(
              <span key={this.getTimeStampValue()} className="view-pic-span" onClick={this.openPhotoModel}>
                  <img alt="dogs" data-title={pic.title} className="view-pic" src={srcPath} />
              </span>             
            )
          })
        } else if(this.page > 1){
          picturesData = 
            <div className="no-result-found">
              <p className="no-result-message">Sorry, no results found</p>
              <p className="no-result-message">Please search something else</p>
            </div>
        }     
    }

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

    if(this.state.modalIsOpen) {
      popUpModel = <>
                     <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                      >
                      <button onClick={this.closeModal} className="close-button">X</button>
                      <div className="model-image-section">
                        <h2 className="model-image-title">{this.modelPicData.title}</h2>
                        <img alt={this.modelPicData.title} src={this.modelPicData.src} className="model-image"/>  
                      </div>
                      

                    </Modal>
                  </>
    }
    return (
      <div className="App">
        <div className="search-content-section">
          <h1>SUPPLY AI ReactJS Assignment</h1>
          <div className="search-bar-section">
              <h3>Search Photos</h3>
              <div className="search-input-section" onMouseLeave={this.hideSearchList}> 
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
          <div className="photo-colletion-section">
              {picturesData}
          </div>
        </div>
        {popUpModel} 
      </div>
    );
  }
}

Modal.setAppElement('#root')

export default App;
