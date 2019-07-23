import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Signup from './user/Signup'
import Signin from './user/Signin'

const Routes =()=>{
    return(
        <div>
            <Switch>
                <Route path='/signup' exact component={Signup}/>
                <Route path='/signin' exact component={Signin}/>
            </Switch>
        </div>
    )
}

export default Routes