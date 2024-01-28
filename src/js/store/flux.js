const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white",
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white",
				},
			],
			arrFavorites: [],
			arrPlanets: [],
			arrCharacters: [],
			planetDetail: [],
			oneItemView: [],
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			// PROYECTO RAUL
			loadInitialApi: async (firstSlug) => {
				console.log("Cargando planetas...");

				try {
					const response = await fetch(
						`https://www.swapi.tech/api/${firstSlug}/`
					);
					if (!response.ok) {
						throw new Error(
							"La respuesta de la red no fue exitosa"
						);
					}
					const data = await response.json();
					console.log(
						"Datos de los planetas cargados exitosamente:",
						data
					);
					setStore({ arrPlanets: data });
				} catch (error) {
					console.error(
						"Se produjo un error al cargar los datos de los planetas:",
						error
					);
				}
			},
			loadPlanetDetail: async (planetUid) => {
				const store = getStore();
				try {
					const response = await fetch(
						`https://www.swapi.tech/api/planets/${planetUid}`
					);
					if (!response.ok) {
						throw new Error(
							"La respuesta de la red no fue exitosa"
						);
					}
					const data = await response.json();
					console.log("Data de cada planeta cargada", data);

					setStore({ planetDetail: data });
				} catch (error) {
					console.error("No se pudo cargar planetData", error);
				}
			},
			loadItemOnClick: async (pathId) => {
				const store = getStore();

				try {
					const response = await fetch(
						`https://www.swapi.tech/api${pathId}`
					);
					const data = await response.json();
					console.log("Data para pag individual cargada:", data);
					setStore({ oneItemView: data });
				} catch (error) {
					console.error(error);
				}
			},
			addToFavorites: async (itemName, itemUid, path) => {
				const store = getStore();

				const newItem = {
					name: itemName,
					uid: itemUid,
					path_url: path,
				};

				// Verificar si el elemento ya está en arrFavorites
				const isItemInFavorites = store.arrFavorites.some(
					(favorite) =>
						favorite.name === newItem.name &&
						favorite.uid === newItem.uid &&
						favorite.path_url === newItem.path_url
				);

				if (isItemInFavorites) {
					// Si el elemento está en arrFavorites, eliminarlo
					const updatedFavorites = store.arrFavorites.filter(
						(favorite) =>
							favorite.name !== newItem.name ||
							favorite.uid !== newItem.uid ||
							favorite.path_url !== newItem.path_url
					);
					setStore({ arrFavorites: updatedFavorites });
				} else {
					// Si el elemento no está en arrFavorites, agregarlo
					setStore({
						arrFavorites: [...store.arrFavorites, newItem],
					});
				}

				console.log("Tus favoritos: ", store.arrFavorites);
			},
		},
	};
};

export default getState;

// TASK:
// Mantener el fa-solid fa-heart cuando se vuelve atras
// Añadir los favoritos a la lista de favoritos de la navbar

// Other fetchs, people...

//Añadir las imagenes
