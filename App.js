import React from 'react';
import reducers from './reducers';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Navigation from './components/Navigation';
import { StatusBar } from 'react-native';

const store = createStore(reducers);

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<StatusBar barStyle="light-content" />
				<Navigation />
			</Provider>
		);
	}
}

export default App;
