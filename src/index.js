import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from  './store/indexstore';


const root =ReactDOM.createRoot(document.getElementById('root'));
root.render(<Router><Provider store={store}><App/></Provider></Router>)

// ReactDOM.render(
//     <Router>
//         <Provider store={store}><App /> </Provider>
//     </Router>, 
//     document.getElementById('root')
// );

registerServiceWorker();
