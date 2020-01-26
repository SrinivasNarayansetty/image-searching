import React from 'react';
import ReactDOM from 'react-dom';
import ImageSearching from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<ImageSearching />, document.getElementById('root'));

serviceWorker.unregister();
