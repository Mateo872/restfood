const URL_PLATO = import.meta.env.VITE_API_PLATOS;
// json-server --watch db.json --port 3004
export const obtenerPlatos = async () => {
    try {
        const respuesta = await fetch(URL_PLATO);
        const listaPlatos = await respuesta.json();
        return listaPlatos;
    } catch (error) {
        console.log(error);
    }
};

export const obtenerPlato = async (id) => {
    try {
        const respuesta = await fetch(`${URL_PLATO}/${id}`);
        const productoEditar = await respuesta.json();
        return productoEditar;
    } catch (error) {
        console.log(error);
    }
};

export const crearPlato = async (plato) => {
    try {
        const respuesta = await fetch(URL_PLATO, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(plato),
        });
        return respuesta;
    } catch (error) {
        console.log(error);
    }
};

export const editarPlato = async (plato, id) => {
    try {
        const respuesta = await fetch(`${URL_PLATO}/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(plato),
        });
        return respuesta;
    } catch (error) {
        console.log(error);
    }
};

export const borrarPlato = async (plato, id) => {
    try {
        const respuesta = await fetch(`${URL_PLATO}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(plato),
        });
        return respuesta;
    } catch (error) {
        console.log(error);
    }
};
