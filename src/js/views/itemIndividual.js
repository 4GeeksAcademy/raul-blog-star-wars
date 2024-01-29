import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useLocation } from "react-router-dom";

export default function ItemIndividual() {
	const { store, actions } = useContext(Context);

	const location = useLocation();
	const pathId = location.pathname;

	// Manipular pathId de location para hacer la imagen dinamica
	const pathNumberUid = Array.from(pathId);

	// Para obtener el UID
	const lastCharachterUid = pathNumberUid.pop();

	// Obtener la palabra del path "/planets/ o /characters/"
	const parts = pathId.split("/");
	const path = parts[1]; //planets, characters...

	const [apiLoaded, setApiLoaded] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				console.log("Ruta actual: ", pathId);
				await actions.loadItemOnClick(pathId);
				setApiLoaded(true);
			} catch (error) {
				console.log(error);
			}
			// CL informativos
			console.log("uid:", location);
			console.log("path extraido de location: ", path);
			console.log("uid extraido de location: ", lastCharachterUid);
		};
		fetchData();
	}, []);

	return (
		<div className="container w-50 mb-5 mt-5 body">
			{apiLoaded && (
				<>
					<div className="row d-flex justify-content-between">
						<div className="col-md-6">
							<img
								className="mt-3"
								src={`https://starwars-visualguide.com/assets/img/${
									path === "people" ? "characters" : path
								}/${lastCharachterUid}.jpg`}></img>
						</div>
						<div className="col-md-6">
							{apiLoaded && (
								<h1>
									{store.oneItemView.result.properties.name}
								</h1>
							)}

							<p>
								Sed ut perspiciatis unde omnis iste natus error
								sit voluptatem accusantium doloremque
								laudantium, totam rem aperiam, eaque ipsa quae
								ab illo inventore veritatis et quasi architecto
								beatae vitae dicta sunt explicabo. Nemo enim
								ipsam voluptatem quia voluptas sit aspernatur
								aut odit aut fugit, sed quia consequuntur magni
								dolores eos qui ratione voluptatem sequi
							</p>
						</div>
					</div>
					<div className="row">
						<hr
							className="divider mt-4"
							style={{ color: "red", height: "5px" }}
						/>

						{Object.entries(store.oneItemView.result.properties)
							.slice(0, 6)
							.map(([key, value]) => (
								<div key={key} className="col-md-4">
									<div className="card my-3">
										<div className="card-body">
											<h6 className="fw-bold text-center">
												{key.toUpperCase()}
											</h6>
											<p className="card-tex text-center">
												{value}
											</p>
										</div>
									</div>
								</div>
							))}
					</div>

					<Link to="/" className="btn btn-danger mt-3">
						<i className="fa-solid fa-arrow-left"></i>
					</Link>
				</>
			)}
			{!apiLoaded && (
				<div className="d-flex justify-content-center">
					<div className="loader"></div>
				</div>
			)}
		</div>
	);
}
