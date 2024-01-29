import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Context } from "../store/appContext";
import ModalIndividual from "./modal-individual";
import { Link, useLocation } from "react-router-dom";

export default function IndividualCard({ itemName, itemUid, path }) {
	const { store, actions, setStore } = useContext(Context);
	const [itemData, setItemData] = useState(null);

	const [apiLoaded, setApiLoaded] = useState(false);

	// Modal (sin uso)
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	// Favorite
	const isFavorite = store.arrFavorites.some(
		(favorite) => favorite.uid === itemUid && favorite.path_url === path
	);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`https://www.swapi.tech/api/${path}/${itemUid}`
				);
				if (!response.ok) {
					throw new Error("La respuesta de la red no fue exitosa");
				}
				const data = await response.json();
				console.log("Data de cada planeta cargada", data);
				setItemData(data);
				setApiLoaded(true);
			} catch (error) {
				console.error("No se pudo cargar itemData", error);
			}
		};

		fetchData();
	}, []);

	function handleFavorite(planet, itemUid, path) {
		actions.addToFavorites(planet, itemUid, path);
	}

	return (
		<>
			<div className="card m-2 " style={{ width: "14rem" }}>
				<img
					className="card-img-top mt-3"
					src={`https://starwars-visualguide.com/assets/img/${
						path === "people" ? "characters" : path
					}/${itemUid}.jpg`}
					onError={(e) => {
						e.target.onerror = null; // Evita un bucle infinito si la imagen de respaldo también falla
						e.target.src =
							"https://starwars-visualguide.com/assets/img/planets/8.jpg";
					}}></img>

				<div className="card-body mb-0">
					<h5 className="card-title text-white">{itemName}</h5>

					{apiLoaded && (
						<>
							{path === "planets" ? (
								<>
									<p className="card-text p-0 m-0">
										<b>Population:</b>{" "}
										{itemData.result.properties.population}
									</p>
									<p className="card-text p-0 m-0">
										<b>Terrain:</b>{" "}
										{itemData.result.properties.terrain}
									</p>
								</>
							) : (
								<>
									<p className="card-text p-0 m-0">
										<b>Height:</b>{" "}
										{itemData.result.properties.height}
									</p>
									<p className="card-text p-0 m-0">
										<b>Birth Year:</b>{" "}
										{itemData.result.properties.birth_year}
									</p>
								</>
							)}
						</>
					)}

					{!apiLoaded && <div className="loader-detail"></div>}
				</div>
				<div className="d-flex justify-content-between mb-3">
					{apiLoaded && (
						<Link
							to={{
								pathname: `/${path}/${itemUid}`,
							}}
							className="btn btn-secondary "
							style={{ textDecoration: "none" }}>
							Learn more
						</Link>
					)}

					<button
						onClick={() => {
							handleFavorite(itemName, itemUid, path);
						}}
						type="button"
						className="btn p-0">
						{isFavorite && (
							<i className="fa-solid fa-heart text-danger fs-5"></i>
						)}
						{!isFavorite && (
							<i className="fa-regular fa-heart text-danger fs-5"></i>
						)}
					</button>
				</div>
			</div>

			<ModalIndividual show={show} handleClose={handleClose} />
		</>
	);
}
