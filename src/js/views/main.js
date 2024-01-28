import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Planets from "../component/planets";
import Characters from "../component/characters";
import ModalIndividual from "../component/modal-individual";
import "../../styles/loaders.css";

const URL_PLANETS = "planets";
const URL_CHARACTERS = "people";

export default function StarWars() {
	const { store, actions } = useContext(Context);

	const [show, setShow] = useState(false);
	const [apiLoaded, setApiLoaded] = useState(false);
	const [error, setError] = useState(false);

	// useEffect para cargar los planetas, asincrona para que pueda cargar .map > cuando se carga setApiLoade = true
	useEffect(() => {
		const fetchData = async () => {
			try {
				await actions.loadInitialApi(URL_PLANETS);
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

	const planets = store.arrPlanets.results;

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

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
					{/* {planets.map((planet, id) => (
						<Planets key={id} planetName={planet.name} />
					))} */}

					{apiLoaded &&
						planets.map((planet, id) => (
							<Planets
								key={id}
								planetName={planet.name}
								planetUid={planet.uid}
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
			<div className="container-fluid d-flex overflow-auto">
				<div className="row flex-row flex-nowrap">
					<Characters />
					<Characters />
					<Characters />
					<Characters />
				</div>
			</div>

			<ModalIndividual show={show} handleClose={handleClose} />
		</div>
	);
}
