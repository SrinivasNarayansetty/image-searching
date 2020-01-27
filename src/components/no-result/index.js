import React from 'react';
import './index.scss';

const NoResultComponent = () => {
    return (
        <div className="no-result-found">
            <p className="no-result-message">Sorry, no results found</p>
            <p className="no-result-message">Please search something else</p>
        </div>
    )
}

export default NoResultComponent;