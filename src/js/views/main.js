import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Planets from "../component/individual-card";
import Characters from "../component/characters";
import ModalIndividual from "../component/modal-individual";
import "../../styles/loaders.css";
import IndividualCard from "../component/individual-card";

export default function StarWars() {
	const { store, actions } = useContext(Context);

	// Verificar si la API cargo y control de errores
	const [apiLoaded, setApiLoaded] = useState(false);
	const [error, setError] = useState(false);

	// Variables globales
	const URL_PLANETS = "planets";
	const URL_CHARACTERS = "people";

	// Categorias
	const planets = store.arrPlanets.results;
	const characters = store.arrCharacters.results;

	// useEffect para cargar los planetas, asincrona para que pueda cargar .map > cuando se carga setApiLoade = true
	useEffect(() => {
		const fetchData = async () => {
			try {
				await actions.loadInitialApi(URL_PLANETS);
				await actions.loadInitialApi(URL_CHARACTERS);
				// setApiLoaded(true);
				setTimeout(() => setApiLoaded(true), 500);
				// await actions.loadAllPlanets();
			} catch (error) {
				console.error("Error loading planets:", error);
				setError(true);
			}
		};

		fetchData();
	}, []);

	if (error) {
		return <div>Error 429: Too Many Requests</div>; // Mostrar mensaje de error
	}

	return (
		<div className="container w-50 body p-5 mt-0">
			{/* <button className="btn btn-primary m-3" onClick={handleShow}>
				Test Modal
			</button> */}
			<h5 className="p-2 text-white text-center border-danger border rounded-2">
				Planets
			</h5>
			<div className="container-fluid overflow-auto mb-4">
				<div className="row flex-row flex-nowrap">
					{apiLoaded &&
						planets.map((planet, id) => (
							<IndividualCard
								key={id}
								itemName={planet.name}
								itemUid={planet.uid}
								path={URL_PLANETS}
							/>
						))}
					{!apiLoaded && (
						<div className="d-flex justify-content-center">
							<div className="loader m-5"></div>
						</div>
					)}
				</div>
			</div>

			{/* CHARACTERS */}
			<h5 className="p-2 text-white text-center border-danger border rounded-2">
				Characters
			</h5>
			<div className="container-fluid overflow-auto mb-4">
				<div className="row flex-row flex-nowrap">
					{apiLoaded &&
						characters.map((character, id) => (
							<IndividualCard
								key={id}
								itemName={character.name}
								itemUid={character.uid}
								path={URL_CHARACTERS}
							/>
						))}
					{!apiLoaded && (
						<div className="d-flex justify-content-center">
							<div className="loader m-5"></div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
