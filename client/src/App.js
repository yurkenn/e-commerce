import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Signin from './pages/Auth/Signin';
import Signup from './pages/Auth/Signup';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import ProtectedRoute from './pages/ProtectedRoute';
import Basket from './pages/Basket';
import Eror404 from './pages/Eror404';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div id="content">
          <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/product/:product_id" component={ProductDetail} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/basket" component={Basket} />
            <ProtectedRoute path="/profile" component={Profile} />
            <Route path="*" component={Eror404} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
