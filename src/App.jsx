//libs
import { Routes, Route } from "solid-app-router";
//pages
import Root from "./pages/Root";
import H_page from "./pages/H";
import R_page from "./pages/R";
import RC_page from "./pages/RC";
import L_page from "./pages/L";
import E_page from "./pages/E";
import S_page from "./pages/S";
import I_page from "./pages/I";
import M_page from "./pages/M";
import N_page from "./pages/N";
import C_page from "./pages/C";
import CU_page from "./pages/CU";
import V_page from "./pages/V";
//TODO
//styles
import styles from "./App.module.css";
//TODO

function App() {
	return (
		<>
		  	<Routes>
		  		<Route path="/" element= {<Root />} /> //user redirect
		  		<Route path="/h" element= {<H_page />} /> //home
		  		<Route path="/r" element= {<R_page />} /> //sign up (instruction)
		  		<Route path="/r/:upcode" element= {<RC_page />} /> //sign up
		  		<Route path="/l" element= {<L_page />} /> //login
		  		<Route path="/e" element= {<E_page />} /> //edit mode
		  		<Route path="/s" element= {<S_page />} /> //settings
		  		<Route path="/i" element= {<I_page />} /> //income
		  		<Route path="/n" element= {<N_page />} /> //add note form
		  		<Route path="/c" element= {<C_page />} /> //search card
		  		<Route path="/:nick" element= {<CU_page />} /> //card data
		  		{/*}<Route path="/:host/:nick" element = {<CU_page />} />*/}// card data from remote host
		  		<Route path="/v" element= {<V_page />} /> //recovery password
		  		<Route path="/m" element= {<M_page />} /> //manifest of project
		  	</Routes>
	  	</>
	);
}

export default App;
