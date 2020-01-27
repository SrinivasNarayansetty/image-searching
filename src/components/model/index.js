import React from 'react';
import './index.scss';

const ModelComponent = (props) => {
    return (
        <div className="model-section" onClick={props.closeModal}>
            <div className="model-content">
                <div className="model-division br5">
                    <button className="close-button" onClick={props.closeModal}>X</button>
                    <h3 className="model-image-title">{props.modelImgData.imgTitle}</h3>
                    <img alt={props.modelImgData.imgTitle} className="model-image br5" src={props.modelImgData.imgSrc}></img>
                </div>
            </div>
            
        </div>
    )
}

export default ModelComponent;