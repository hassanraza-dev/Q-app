import React from 'react'
import {
    BrowserRouter as Router, //alias (nickname)
    Switch,
    Route,
    Redirect
    
} from "react-router-dom";
import Login from '../views/login'
import Home from '../views/home'
import Company from '../views/company'
import Detail  from '../views/detail'
import Customer from '../views/customer'

const MainRouter = function({isLoggedIn})
{
    
    const currentPath = window.location.pathname.length === 1 ? 'home' : window.location.pathname
    console.log('current path',window.location.pathname.length)
    return(
        <Router>
            <div>
                <Switch>
                <Route path='/customer'>
                {AuthChecker(isLoggedIn, <Customer />)}
                    </Route>
                
                <Route path='/detail/:slug'>
                {AuthChecker(isLoggedIn, <Detail />)}
                    </Route>
                   

                    <Route path='/home'>
                    {AuthChecker(isLoggedIn, <Home />)}
                    </Route>

                

                    <Route path='/company'>
                {AuthChecker(isLoggedIn, <Company />)}
                    </Route>

                 

                    <Route path='/'>
                    {isLoggedIn ? <Redirect to={currentPath} /> : <Login />}
                    </Route>


                </Switch>

            </div>
            
        </Router>
    )
}
function AuthChecker(isLoggedIn, component) {
    return isLoggedIn ? component : <Redirect to='/' />
}

export default MainRouter