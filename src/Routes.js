import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Home from './core/Home'
import PrivateRoute from './auth/PrivateRoute'
import Dashboard from './user/UserDashboard'
import AdminRoute from './auth/AdminRoute'
import AdminDashboard from './user/AdminDashboard'
import AddCategory from './Admin/AddCategory'
import AddProduct from './Admin/AddProduct'
import Shop from './core/Shop'
import Product from './core/Product'
import Cart from './core/Cart'
import Orders from './Admin/Orders'

import './style.css'
const Routes =()=>{
    return(
        <BrowserRouter>
        
        <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/shop' exact component={Shop}/>
                <Route path='/signup' exact component={Signup}/>
                <Route path='/signin' exact component={Signin}/>    
                <Route path='/cart' exact component={Cart}/>       
                <Route path='/product/:productId' exact component={Product}/>              
                <PrivateRoute path='/user/dashboard' exact component={Dashboard}/>
                <AdminRoute path='/admin/dashboard' exact component={AdminDashboard}/>
                <AdminRoute path='/create/category' exact component={AddCategory}/>
                <AdminRoute path='/create/product' exact component={AddProduct}/>
                <AdminRoute path='/orders' exact component={Orders}/>
                
            </Switch>
        </BrowserRouter>
            
        
    )
}

export default Routes