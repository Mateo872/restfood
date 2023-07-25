const URL_PLATO = import.meta.env.VITE_API_PLATOS;
const URL_USUARIO = import.meta.env.VITE_API_USUARIO;

export const iniciarSesion = async (usuario) => {
  try {
    const respuesta = await fetch(URL_USUARIO);
    const listaUsuarios = await respuesta.json();
    const usuarioBuscado = listaUsuarios.find(
      (itemUsuario) => itemUsuario.email === usuario.email
    );
    if (usuarioBuscado) {
      if (usuarioBuscado.password === usuario.password) {
        return usuarioBuscado;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const registro = async (usuario) => {
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
      productosFavoritos: datos.productosFavoritos,
      uid: datos.uid,
      // token: datos.token,
    };
  } catch (error) {
    console.log(error);
  }
};

export const obtenerUsuario = async (id) => {
  try {
    const respuesta = await fetch(`${URL_USUARIO}/${id}`);
    const usuario = await respuesta.json();
    if (!usuario.favoritos) {
      usuario.favoritos = [];
    }

    return usuario;
  } catch (error) {
    console.log(error);
  }
};

export const editarUsuario = async (usuario, id) => {
  try {
    const respuesta = await fetch(`${URL_USUARIO}/${id}`, {
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

export const agregarFavoritos = async (idUsuario, arrayIdsPlatos) => {
  try {
    const usuario = await obtenerUsuario(idUsuario);

    if (!usuario) {
      throw new Error("Usuario no encontrado.");
    }

    const platosActuales = usuario.favoritos.map((plato) => plato.id);

    const nuevosPlatos = arrayIdsPlatos.filter(
      (idPlato) => !platosActuales.includes(idPlato)
    );

    const platosARemover = platosActuales.filter((idPlato) =>
      arrayIdsPlatos.includes(idPlato)
    );

    const platos = await Promise.all(
      nuevosPlatos.map((idPlato) => obtenerPlato(idPlato))
    );

    const platosValidos = platos.filter((plato) => !!plato);

    usuario.favoritos.push(...platosValidos);

    usuario.favoritos = usuario.favoritos.filter(
      (plato) => !platosARemover.includes(plato.id)
    );

    await editarUsuario(usuario, idUsuario);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const agregarCarrito = async (usuarioID, productoID, nuevoProducto) => {
  try {
    const usuario = await obtenerUsuario(usuarioID);

    if (!usuario) {
      throw new Error("Usuario no encontrado.");
    }

    const carritoActual = usuario.carrito || [];

    const productoExistente = carritoActual.find(
      (producto) =>
        producto.id === productoID && producto.precio === nuevoProducto.precio
    );

    if (productoExistente) {
      productoExistente.cantidad += nuevoProducto.cantidad;
    } else {
      carritoActual.push(nuevoProducto);
    }

    usuario.carrito = carritoActual;

    await editarUsuario(usuario, usuarioID);

    return usuario.carrito;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const agregarPedidos = async (usuarioID, datos) => {
  try {
    const usuario = await obtenerUsuario(usuarioID);

    if (!usuario) {
      throw new Error("Usuario no encontrado.");
    }

    if (usuario.carrito.length === 0) {
      throw new Error("No hay productos en el carrito.");
    }

    const pedidoActual = usuario.pedidos || [];
    pedidoActual.push(datos);
    usuario.pedidos = pedidoActual;

    usuario.carrito = [];

    await editarUsuario(usuario, usuarioID);

    return usuario.pedidos;
  } catch (error) {
    console.log(error);
    throw error;
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

export const borrarPlatos = async (ids) => {
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
