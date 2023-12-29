import { Login, Producto, Usuario } from "../../types/types";

const URL_PLATO = import.meta.env.VITE_API_PLATOS;
const URL_USUARIO = import.meta.env.VITE_API_USUARIO;

export const iniciarSesion = async (usuario: Usuario) => {
  try {
    const respuesta = await fetch(URL_USUARIO, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    const datos: Login = await respuesta.json();

    return {
      status: respuesta.status,
      mensaje: datos.mensaje,
      nombre: datos.nombre,
      email: datos.email,
      imagen: datos.imagen,
      estado: datos.estado,
      rol: datos.rol,
      pedidos: datos.pedidos,
      carrito: datos.carrito,
      favoritos: datos.favoritos,
      _id: datos.uid,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const registro = async (usuario: Omit<Usuario, "__v" | "_id">) => {
  try {
    const respuesta = await fetch(`${URL_USUARIO}/nuevo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
    const datos: Login = await respuesta.json();

    return {
      status: respuesta.status,
      contrasenia: datos.contrasenia,
      nombre: datos.nombre,
      email: datos.email,
      imagen: datos.imagen,
      estado: datos.estado,
      rol: datos.rol,
      pedidos: datos.pedidos,
      carrito: datos.carrito,
      favoritos: datos.favoritos,
    };
  } catch (error) {
    console.log(error);
  }
};

export const obtenerUsuarios = async () => {
  try {
    const respuesta = await fetch(URL_USUARIO);
    const listaUsuarios: Usuario[] = await respuesta.json();
    return listaUsuarios;
  } catch (error) {
    console.log(error);
  }
};

export const obtenerUsuario = async (id: Usuario["_id"]) => {
  try {
    const respuesta = await fetch(`${URL_USUARIO}/usuario/${id}`);
    const usuario: Usuario = await respuesta.json();

    return usuario;
  } catch (error) {
    console.log(error);
  }
};

export const eliminarUsuario = async (id: Usuario["_id"]) => {
  try {
    const respuesta = await fetch(`${URL_USUARIO}/usuario/${id}`, {
      method: "DELETE",
    });
    return respuesta;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editarUsuario = async (
  usuario: Partial<Usuario>,
  id: Usuario["_id"]
) => {
  try {
    const respuesta = await fetch(`${URL_USUARIO}/usuario/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

export const obtenerPlatos = async () => {
  try {
    const respuesta = await fetch(URL_PLATO);
    const listaPlatos: Producto[] = await respuesta.json();
    return listaPlatos;
  } catch (error) {
    console.log(error);
  }
};

export const obtenerPlato = async (id: Usuario["_id"]) => {
  try {
    const respuesta = await fetch(`${URL_PLATO}/${id}`);
    const productoEditar: Producto = await respuesta.json();
    return productoEditar;
  } catch (error) {
    console.log(error);
  }
};

export const crearPlato = async (plato: Omit<Producto, "_id" | "__v">) => {
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

export const editarPlato = async (
  plato: Partial<Producto>,
  id: Usuario["_id"]
) => {
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

export const borrarPlato = async (id: Usuario["_id"]) => {
  try {
    const respuesta = await fetch(`${URL_PLATO}/${id}`, {
      method: "DELETE",
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

export const borrarPlatos = async (ids: Usuario["_id"][]) => {
  try {
    const respuestas = await Promise.all(
      ids.map((id) =>
        fetch(`${URL_PLATO}/${id}`, {
          method: "DELETE",
        })
      )
    );
    return respuestas;
  } catch (error) {
    console.log(error);
  }
};
