import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import starWarsLogo from "../../img/starwars-logo.png";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	function handleDeleteItem() {
		actions.addToFavorites();
	}

	return (
		<nav className="navbar navbar-light bg-dark mb-0 d-flex justify-content-around p-4">
			<div className="container w-50 d-flex justify-content-between">
				<Link to="/">
					<img
						className=""
						style={{ width: "100px", filter: "invert(100%)" }}
						src={starWarsLogo}></img>
				</Link>

				<div className="ml-auto">
					<div class="dropdown open">
						<button
							class="btn btn-danger dropdown-toggle"
							type="button"
							id="triggerId"
							data-bs-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false">
							Favorites
						</button>
						<div class="dropdown-menu" aria-labelledby="triggerId">
							{store.arrFavorites &&
								store.arrFavorites.map((item, index) => (
									<div
										key={index}
										className="dropdown-item d-flex justify-content-between">
										<div className="d-flex align-middle">
											<Link
												to={`/${item.path_url}/${item.uid}`}
												className="text-white pt-2"
												style={{
													textDecoration: "none",
												}}>
												{item.name}
											</Link>
										</div>

										<button
											onClick={() => {
												// Uso como delete la misma funcion que añade items
												actions.addToFavorites(
													item.name,
													item.uid,
													item.path_url
												);
												console.log(
													"Delete succesfull: ",
													item.name
												);
											}}
											className="btn pe-0">
											<i class="fa-solid fa-xmark text-danger"></i>
										</button>
									</div>
								))}
							{store.arrFavorites.length <= 0 && (
								<p className="text-center p-0 m-0">Empty</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};
