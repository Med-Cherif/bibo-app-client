import { render } from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux"
import store from './redux/store';
import AppProvider from "./context/AppContext"

render(
  <Provider store={store}>
      <Router>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>
  </Provider>,
  document.getElementById('root')
);