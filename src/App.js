import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import 'antd-mobile/dist/antd-mobile.css';
import './App.css';
import Home from './pages/Home';
import PokemonDetail from './components/PokemonDetail';

class App extends React.Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/detail/:ID" render={(props) => <PokemonDetail {...props} />} />
				</Switch>
			</Router>
		)
	}
}

export default App;