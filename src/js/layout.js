import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import injectContext from "./store/appContext";

import StarWars from "./views/main";
import ItemIndividual from "./views/itemIndividual";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<>
			<div class="stars"></div>
			<div class="twinkling"></div>
			<div class="clouds"></div>
			<div className="">
				<BrowserRouter basename={basename}>
					<ScrollToTop>
						<Navbar />
						<Routes>
							<Route path="/" element={<StarWars />} />
							<Route
								path="/planets/:theid"
								element={<ItemIndividual />}
							/>

							<Route
								path="/people/:theid"
								element={<ItemIndividual />}
							/>

							<Route path="*" element={<h1>Not found!</h1>} />
						</Routes>
						<Footer />
					</ScrollToTop>
				</BrowserRouter>
			</div>
		</>
	);
};

export default injectContext(Layout);
