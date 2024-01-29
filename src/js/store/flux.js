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
			loadInitialApi: async (path) => {
				console.log(`Cargando ${path}...`);

				try {
					const response = await fetch(
						`https://www.swapi.tech/api/${path}/`
					);
					if (!response.ok) {
						throw new Error(
							"La respuesta de la red no fue exitosa"
						);
					}
					const data = await response.json();
					console.log(
						`Datos de los ${path} cargados exitosamente:`,
						data
					);
					if (path === "planets") setStore({ arrPlanets: data });
					if (path === "people") setStore({ arrCharacters: data });
					// if (path === "vehicles") setStore({ arrVehicles: data });
				} catch (error) {
					console.error(
						`Se produjo un error al cargar los datos de los ${path}: `,
						error
					);
				}
			},
			loadPlanetDetail: async (planetUid) => {
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
