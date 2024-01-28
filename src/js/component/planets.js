import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Context } from "../store/appContext";
import ModalIndividual from "./modal-individual";
import { Link, useLocation } from "react-router-dom";

export default function Planets({ planetName, planetUid }) {
	const URL_PLANETS = "planets";
	const URL_CHARACTERS = "people";
	const { store, actions, setStore } = useContext(Context);
	const [planetData, setPlanetData] = useState(null);
	const [apiLoaded, setApiLoaded] = useState(false);

	// MODAL
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	// Favorite
	const isFavorite = store.arrFavorites.some(
		(favorite) =>
			favorite.uid === planetUid && favorite.path_url === URL_PLANETS
	);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`https://www.swapi.tech/api/planets/${planetUid}`
				);
				if (!response.ok) {
					throw new Error("La respuesta de la red no fue exitosa");
				}
				const data = await response.json();
				console.log("Data de cada planeta cargada", data);
				setPlanetData(data);
				setApiLoaded(true);
			} catch (error) {
				console.error("No se pudo cargar planetData", error);
			}
		};

		fetchData();
	}, []);

	function handleFavorite(planet, planetUid, URL_PLANETS) {
		actions.addToFavorites(planet, planetUid, URL_PLANETS);
	}

	return (
		<>
			<div className="card m-2 " style={{ width: "14rem" }}>
				<img
					className="card-img-top mt-3"
					src={`https://starwars-visualguide.com/assets/img/${URL_PLANETS}/${
						planetUid === "1" ? 8 : planetUid
					}.jpg`}></img>
				<div className="card-body mb-0">
					<h5 className="card-title text-white">{planetName}</h5>

					{apiLoaded && (
						<>
							<p className="card-text p-0 m-0">
								<b>Population:</b>{" "}
								{planetData.result.properties.population}
							</p>
							<p className="card-text p-0 m-0">
								<b>Terrain:</b>{" "}
								{planetData.result.properties.terrain}
							</p>
						</>
					)}
					{!apiLoaded && <div className="loader-detail"></div>}
				</div>
				<div className="d-flex justify-content-between mb-3">
					{apiLoaded && (
						<Link
							to={{
								pathname: `/planets/${planetUid}`,
							}}
							className="btn btn-secondary "
							style={{ textDecoration: "none" }}>
							Learn more
						</Link>
					)}

					<button
						onClick={() => {
							handleFavorite(planetName, planetUid, URL_PLANETS);
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
