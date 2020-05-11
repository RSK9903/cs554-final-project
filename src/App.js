import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Main from './components/Main';
import UserPage from './components/UserPage';


function App() {
  return (
    <Router>
			<div className='App'>
				<header className='App-header'>
					<h1 className='App-title'>Quarantine Kitchen</h1>
				</header>
				<div className='App-body'>
					<h2>Welcome to the Quarantine Kitchen</h2>
          <Switch>
					<Route exact path='/' component={Main} />
					<Route path='/user/:id' exact component={UserPage} />
					{/* <Route path='/pokemon/:id' exact component={Pokemon} />
					<Route path='/berries/page/:page' exact component={Resources} />
					<Route path='/berries/:id' exact component={Berry} />        
					<Route path='/machines/page/:page' exact component={Resources} />
					<Route path='/machines/:id' exact component={Machine} /> */}
          <Route path="*" exact component={Error} status={404}/>
          </Switch>
				</div>
			</div>
		</Router>
  );
}

export default App;
