import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import HomeScreen from './Screens/HomeScreen'
import StoreScreen from './Screens/StoreScreen'
import ProductScreen from './Screens/ProductScreen'

function App() {
  return (
    <Router>
      <Header />
      <div>
        
        <Route path='/' component={HomeScreen} exact />
        <Route path='/store' component={StoreScreen} exact />
        <Route path='/product/:id' component={ProductScreen} />
      </div>
      
      <Footer />
    </Router>
   
  );
}

export default App;
