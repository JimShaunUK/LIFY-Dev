import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import HomeScreen from './Screens/HomeScreen'
import TownScreen from './Screens/TownScreen'
import StoreScreen from './Screens/StoreScreen'
import ProductScreen from './Screens/ProductScreen'
import RetailerScreen from './Screens/RetailerScreen'
import RetailerProductScreen from './Screens/RetailerProductScreen'
import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen'
import RegisterScreenTwo from './Screens/RegisterScreenTwo'
import ProfileScreen from './Screens/ProfileScreen'
import CartScreen from './Screens/CartScreen'
import ReviewOrderScreen from './Screens/ReviewOrderScreen'
import PaymentScreen from './Screens/PaymentScreen'
import OrderScreen from './Screens/OrderScreen'
import AboutScreen from './Screens/AboutScreen'
import SearchScreen from './Screens/SearchScreen'
import ResultsScreen from './Screens/ResultsScreen'

//Retailer Only Screens
import RetailerOrdersScreen from './Screens/RetailerOrdersScreen'
import RetailerOrderReviewScreen from './Screens/RetailerOrderReviewScreen'
import ProductListScreen from './Screens/ProductListScreen'
import ProductEditScreen from './Screens/ProductEditScreen'

//courierScreens
import AvailableDeliveriesScreen from './Screens/AvailableDeliveryScreen'
import DeliveryScreen from './Screens/DeliveryScreen'
//Admin Only Screens


function App() {
  return (
    <Router>
      <Header />
      <div>
        
        <Route path='/' component={HomeScreen} exact />
        <Route path='/towns' component={TownScreen} exact />
        <Route path='/town/products/:id' component={StoreScreen} exact />
        <Route path='/town/retailers/:id' component={RetailerScreen} exact />
        <Route path='/town/retailer/products/:id' component={RetailerProductScreen} exact />
        <Route path='/product/:id' component={ProductScreen} />
        <Route path='/about' component={AboutScreen} exact />

        <Route path='/search' component={SearchScreen} exact />
        <Route path='/results/:keyword' component={ResultsScreen} exact />

        <Route path='/login' component={LoginScreen} />
        <Route path='/register' component={RegisterScreen} exact />
        <Route path='/register/complete' component={RegisterScreenTwo} exact />
        <Route path='/profile' component={ProfileScreen} />

        <Route path='/cart/:id?' component={CartScreen} />
        <Route path='/review/order' component={ReviewOrderScreen} exact/>
        <Route path='/review/order/pay' component={PaymentScreen} exact />

        <Route path='/order/:id' component={OrderScreen} />

        <Route path='/retailers/orders' component={RetailerOrdersScreen} exact/>
        <Route path='/retailers/orders/:id' component={RetailerOrderReviewScreen} exact/>

        <Route path='/retailer/productlist' component={ProductListScreen} />
         <Route path='/retailer/product/:id/edit' component={ProductEditScreen} />


         <Route path='/courier/available' component={AvailableDeliveriesScreen} exact/>
         <Route path='/deliver/:id' component={DeliveryScreen} />
      </div>
      
      <Footer />
    </Router>
   
  );
}

export default App;
