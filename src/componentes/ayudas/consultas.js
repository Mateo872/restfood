const URL_PLATO = import.meta.env.VITE_API_PLATOS;
const URL_USUARIO = import.meta.env.VITE_API_USUARIO;

export const login = async (usuario) => {
  try {
    const respuesta = await fetch(URL_USUARIO, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
    const datos = await respuesta.json();

    return {
      status: respuesta.status,
      contrasenia: datos.contrasenia,
      usuario: datos.nombre,
      email: datos.email,
      imagen: datos.imagen,
      estado: datos.estado,
      rol: datos.rol,
      pedido: datos.pedido,
      carrito: datos.carrito,
      uid: datos.uid,
      // token: datos.token,
    };
  } catch (error) {
    console.log(error);
  }
};

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

export const borrarPlato = async (id) => {
  try {
    const respuesta = await fetch(`${URL_PLATO}/${id}`, {
      method: "DELETE",
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};
