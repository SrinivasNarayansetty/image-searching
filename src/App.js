import React from 'react';
import './App.scss';
import { isArray } from 'util';
import loader from './images/Loader.gif';
import Modal from 'react-modal';
import commonConfig from './utils/config'
import urls from './utils/urls';

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

/**
 * @name : ImageSearching
 * @description : This class is useful for searching images based on user input
 * @argument {*} props
 * @argument {*} propTypes
 * @argument {*} defaultProps
 * @author SrinivasNarayansetty
 */
class ImageSearching extends React.Component{
  /**
   * @constructor
   * @param {*} context 
   * @param {*} props 
  */
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

  /**
   * @name hideSearchList
   * @description Method used for hiding search inputs suggestions list
   * @method ImageSearching
   */
  hideSearchList() {
    this.setState({userTyping:false})
  }

  /**
   * @name showSearchList
   * @description Method used for showing search inputs suggestions list
   * @method ImageSearching
   */
  showSearchList() {
    this.setState({userTyping:true})
  }

  /**
   * @name componentDidMount
   * @description Once component successfully mounted then it will bind methods to window
   * @method ImageSearching
   */
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  /**
   * @name openPhotoModel
   * @description Method used to open photo in popup model
   * @method ImageSearching
   */
  openPhotoModel(e) {
    this.modelPicData.title = e.target.getAttribute('data-title');
    this.modelPicData.src = e.target.src;
    this.setState({modalIsOpen:true})
  }

  /**
   * @name closeModal
   * @description Method used to close photo popup model
   * @method ImageSearching
   */
  closeModal() {
    this.setState({modalIsOpen:false})
    this.modelPicData.title = '';
    this.modelPicData.src = '';
  }

  /**
   * @name handleScroll
   * @description Method will be called when user starts scrolling in page
   * @method ImageSearching
   */
  handleScroll() {
    if((window.innerHeight + window.scrollY+ 300) >= (document.body.offsetHeight-300) && !this.apiCallSent) {
      this.getPhotos(true);
      this.apiCallSent = true;
    }
  }

  /**
   * @name startLoading
   * @description Method will show the loader in page when API request is going on
   * @method ImageSearching
   */
  startLoading() {
    this.setState({loading:true});
  }

  /**
   * @name getPhotos
   * @description Method used for hitting API and getting photos
   * @method ImageSearching
   */
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
  
      let imageSearchUrl = urls.imageSearchUrl;
      imageSearchUrl += '&api_key='+commonConfig.apiKey;
      imageSearchUrl += '&tags='+val;
      imageSearchUrl += '&format='+commonConfig.responseFormat;
      imageSearchUrl += '&nojsoncallback='+commonConfig.nojsoncallback;
      imageSearchUrl += '&page='+pageNumber;
      
      fetch(imageSearchUrl)
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

  /**
   * @name getRandomKey
   * @description Method will return random key using date value
   * @method ImageSearching
   */
  getRandomKey() {
    this.counter = (this.counter + 1);
    let now = new Date();
    let timestamp = now.getUTCMilliseconds();
    timestamp = now.getFullYear().toString(); // 2011
    timestamp += (now.getMonth < 9 ? '0' : '') + now.getMonth().toString(); // JS months are 0-based, so +1 and pad with 0's
    timestamp += ((now.getDate < 10) ? '0' : '') + now.getDate().toString();
    timestamp +=  this.counter.toString();
    return ('pic'+timestamp);
  }

  /**
   * @name debouncing
   * @description Method will implements javascript debouncing technique
   * @method ImageSearching
   */
  debouncing(fn, delay) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      fn();
    },delay);
  }
  
  /**
   * @name handleInput
   * @description Method will set searchInput value when user is typing in search input
   * @method ImageSearching
   */
  handleInput(e) {
    let val = e.target.value.trim();
    this.setState({searchInput: val,userTyping:true});
    if(val && val !== '') {
      this.debouncing(this.getPhotos, 1500);
    }
  }

  /**
   * @name changeSearchInput
   * @description Method will set searchInput value to cliked search list item value
   * @method ImageSearching
   */
  changeSearchInput(e) {
    let val = e.target.getAttribute('data-value');
    this.setState({searchInput: val});
    this.getPhotos(false, val) ;
  }

  /**
   * @name clearFilters
   * @description Method will clear the search input list history
   * @method ImageSearching
   */
  clearFilters() {
    if(localStorage.getItem('searchInputsList')) {
      let searchInputsList = [];
      localStorage.setItem('searchInputsList',JSON.stringify(searchInputsList));
      this.setState({userTyping:false});
    }
  }

  /**
   * @name clearSearchInput
   * @description Method will clear the search input value
   * @method ImageSearching
   */
  clearSearchInput() {
    this.setState({searchInput:''})
  }

  /**
   * @name render
   * @description renders the component according to provided content and returns the appropriate HTML
   * @method ImageSearching
   * @returns HTML
   */
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
              <span key={this.getRandomKey()} className="view-pic-span br5" onClick={this.openPhotoModel}>
                  <img alt="dogs" data-title={pic.title} className="view-pic br5" src={srcPath} />
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
              <li className="serch-list-item" data-value={key} key={this.getRandomKey()} onClick={this.changeSearchInput}>
                {key}
              </li>)
          });

          clearSearchItems = <button className="clear-button br3 fs16" onClick={this.clearFilters}>Clear</button>
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
                        <img alt={this.modelPicData.title} src={this.modelPicData.src} className="model-image br5"/>  
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
                  <input value={this.state.searchInput} className="search-input br3 fs16" placeholder="search item" type="text" onChange={this.handleInput} onKeyDown={this.handleInput} onFocus={this.showSearchList}></input>
                  <button className="close-button" onClick={this.clearSearchInput}>X</button>
                </div>
                <div className="search-list-section br3">
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

export default ImageSearching;
