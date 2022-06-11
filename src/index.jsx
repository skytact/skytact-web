//
import { render } from "solid-js/web";
import { Router } from "solid-app-router";
//
import './index.css';
import App from './App';
//rendering
render(() => (
	<Router>
		<App />
	</Router>
	), 
	document.getElementById('root')
);
