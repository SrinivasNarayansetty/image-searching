import React from 'react';
import './index.scss';


const ListComponent = (props) => {
  const photoData = props.photoData;
  const picturesData = photoData.map((pic,index) => {
      const srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
      return(
        <div key={"pic-"+index} className="view-pic-span br5" onClick={props.openPhotoModel}>
            <img alt={pic.title} data-title={pic.title} className="view-pic br5" src={srcPath} />
        </div>             
      )
    })
  return (
      <div className="photo-colletion-section">
        {picturesData}
    </div>
  )
}

export default ListComponent;