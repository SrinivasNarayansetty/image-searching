import React from 'react';
import './index.scss';
import loader from '../../assets/Loader.gif';

const LoaderComponent = () => {
    return (
        <div className="loader-section">
            <h3>Loading...Please wait</h3>
            <img alt="loader" className="loader-image" src={loader} />
        </div>
    )
}

export default LoaderComponent;