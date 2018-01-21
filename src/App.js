import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import ExplorePage from './pages/ExplorePage/ExplorePage';
import PickContent from './pages/CreatePage/PickContent/PickContent';
import PickStylePage from './pages/CreatePage/PickStyle/PickStylePage';
import PreviewPage from './pages/CreatePage/Preview/Preview';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import DetailPage from './pages/DetailPage/DetailPage';

import PasswordForgetPage from './pages/PasswordForget/PasswordForget'
import AccountPage from './pages/Account/Account';
import * as routes from './constants/routes';
import Home from './pages/Home';


class App extends React.Component {
  render() {
    return (
    	<Router>
			<div>
				<Route exact path="/" component={HomePage}/>
				<Route exact path="/explore" component={ExplorePage}/>
				<Route exact path="/create/pickcontent" component={PickContent}/>
				<Route exact path="/create/pickstyle" component={PickStylePage}/>
				<Route exact path="/create/preview" component={PreviewPage}/>
				<Route exact path="/login" component={LoginPage}/>
				<Route exact path="/register" component={RegisterPage}/>
				<Route exact path="/designs/:id" component={DetailPage}/>
				
				<Route exact path={routes.EXPLOREPAGE} component={ExplorePage}/>
				<Route exact path={routes.PICKCONTENTPAGE} component={PickContent}/>
				<Route exact path={routes.PICKSTYLEPAGE} component={PickStylePage}/>
				<Route exact path={routes.LOGINPAGE} component={LoginPage}/>
				<Route exact path={routes.REGISTERPAGE} component={RegisterPage}/>
				<Route exact path={routes.DETAILPAGE} component={DetailPage}/>


				<Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
   			<Route exact path={routes.ACCOUNTPAGE} component={() => <AccountPage />} />
			  <Route exact path={routes.HOMEPAGE} component={() => <HomePage />} />
			  <Route exact path={routes.HOME} component={() => <Home />} />
			</div>
		</Router>
    );
  }
}

export default App;
