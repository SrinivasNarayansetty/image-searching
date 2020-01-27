import React from 'react';
import './App.scss';
import { isArray } from 'util';
import commonConfig from './utils/config'
import urls from './utils/urls';
import SearchComponent from './components/search/index';
import ListComponent from './components/list/index';
import LoaderComponent from './components/loader/index';
import NoResultComponent from './components/no-result/index';
import ModelComponent from './components/model/index';
import HelperObject from './utils/helper';

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
      userTyping: false,
      modalIsOpen: false,
      modelImgData: {}
    }
    this.timer = '';
    this.page = 1;
    this.apiCallSent = false;
    this.modelPicData = {
      title : '',
      src: ''
    }
    this.getPhotos = this.getPhotos.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.openPhotoModel = this.openPhotoModel.bind(this);
    this.changeSearchInput = this.changeSearchInput.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.hideSearchList = this.hideSearchList.bind(this);
    this.showSearchList = this.showSearchList.bind(this);
    this.clearSearchInput = this.clearSearchInput.bind(this);
    this.setDataToSearchList = this.setDataToSearchList.bind(this);
    
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
    let modelPicData = {
      'imgTitle' : e.target.getAttribute('data-title'),
      'imgSrc': e.target.src
    }
    this.setState({modalIsOpen:true ,modelImgData:modelPicData})
  }

  /**
   * @name closeModal
   * @description Method used to close photo popup model
   * @method ImageSearching
   */
  closeModal() {
    this.setState({modalIsOpen:false})
    this.setState({modelImgData:{}})
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

    if(val && val.trim() !== '') {
      this.setState({userTyping:false})
      this.setDataToSearchList(val);
  
      if(!fromScrollFlag) {
        this.startLoading();
      }
      this.getPhotoData(val, fromScrollFlag);
      
    }
  }

  getPhotoData(val, fromScrollFlag) {
    let photoData = this.state.photoData,
        pageNumber = this.page,
        imageSearchUrl = urls.imageSearchUrl+'&api_key='+commonConfig.apiKey+'&tags='+val+'&format='+commonConfig.responseFormat+'&nojsoncallback='+commonConfig.nojsoncallback+'&page='+pageNumber;

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
    }.bind(this));
      
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
      HelperObject.debouncing(this.getPhotos, 1500);
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
   * @name setDataToSearchList
   * @description Sets data to search suggestions list
   * @method ImageSearching
   */
  setDataToSearchList(val) {
    let searchList = [];
    if(HelperObject.getFromLocalStorage('searchInputsList')) {
      searchList = HelperObject.getFromLocalStorage('searchInputsList')
    }
    if(searchList.indexOf(val) === -1)  {
      if(searchList.length === commonConfig.searchListLimit) {
        searchList.splice(0,1);
      }
      searchList.push(val);
    } 
    HelperObject.setToLocalStorage('searchInputsList',searchList);
  }

  /**
   * @name render
   * @description renders the component according to provided content and returns the appropriate HTML
   * @method ImageSearching
   * @returns HTML
   */
  render() {
    let picturesData,
        photoData = this.state.photoData;

    if(this.state.loading) {
      picturesData = <LoaderComponent></LoaderComponent>
    } else {
        if(photoData.length > 0) {
          picturesData = <ListComponent 
                          photoData={photoData}
                          openPhotoModel={this.openPhotoModel}></ListComponent>
        } else if(this.page > 1){
          picturesData = <NoResultComponent></NoResultComponent>
        }     
    }

    return (
      <>
        <div className="App">
          <div className="search-content-section">
            <h1>SUPPLY AI ReactJS Assignment</h1>
            <SearchComponent 
              userTyping = {this.state.userTyping}
              searchInput = {this.state.searchInput}
              onMouseLeave={this.hideSearchList}
              handleInput = {this.handleInput}
              onInputFocus = {this.showSearchList}
              onSearchItemClick ={this.changeSearchInput}
              clearFilters = {this.clearFilters}
              clearSearchInput= {this.clearSearchInput}
            ></SearchComponent>
            {picturesData}
          </div>
        </div>

        {this.state.modalIsOpen && <ModelComponent modelImgData={this.state.modelImgData} closeModal={this.closeModal}></ModelComponent>}
      </>
    );
  }
}

export default ImageSearching;
