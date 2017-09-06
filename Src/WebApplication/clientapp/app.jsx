import Header from './components/header';
import Body from './components/body';
import React, { Component } from 'react';

class App extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<Header />
				<Body />
			</div>
		);
	}
}

export default App;