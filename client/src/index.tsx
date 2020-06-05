import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { makeAuthRouting } from './routing';

ReactDOM.render( makeAuthRouting(),
  document.getElementById('root')
);

serviceWorker.unregister();
