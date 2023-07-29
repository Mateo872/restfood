const URL_PLATO = import.meta.env.VITE_API_PLATOS;
const URL_USUARIO = import.meta.env.VITE_API_USUARIO;

export const iniciarSesion = async (usuario) => {
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
      mensaje: datos.mensaje,
      nombre: datos.nombre,
      email: datos.email,
      imagen: datos.imagen,
      estado: datos.estado,
      rol: datos.rol,
      pedidos: datos.pedidos,
      carrito: datos.carrito,
      favoritos: datos.favoritos,
      estado: datos.estado,
      _id: datos.uid,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const registro = async (usuario) => {
  try {
    const respuesta = await fetch(`${URL_USUARIO}/nuevo`, {
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
      favoritos: datos.favoritos,
      _id: datos._id,
    };
  } catch (error) {
    console.log(error);
  }
};

export const verificarEmailExistente = async (email) => {
  try {
    const respuesta = await fetch(`${URL_USUARIO}?email=${email}`);
    const usuariosConMismoEmail = await respuesta.json();
    return usuariosConMismoEmail && usuariosConMismoEmail.length > 0;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const obtenerUsuarios = async () => {
  try {
    const respuesta = await fetch(URL_USUARIO);
    const listaUsuarios = await respuesta.json();
    return listaUsuarios;
  } catch (error) {
    console.log(error);
  }
};

export const obtenerUsuario = async (id) => {
  try {
    const respuesta = await fetch(`${URL_USUARIO}/usuario/${id}`);
    const usuario = await respuesta.json();

    return usuario;
  } catch (error) {
    console.log(error);
  }
};

export const eliminarUsuario = async (id) => {
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

export const agregarFavoritos = async (idUsuario, arrayIdsPlatos) => {
  try {
    const usuario = await obtenerUsuario(idUsuario);

    if (!usuario) {
      throw new Error("Usuario no encontrado.");
    }

    const platosActuales = usuario.favoritos || [];

    const nuevosPlatos = arrayIdsPlatos.filter(
      (idPlato) => !platosActuales.includes(idPlato)
    );

    const platosARemover = platosActuales.filter((idPlato) =>
      arrayIdsPlatos.includes(idPlato)
    );

    usuario.favoritos = [...platosActuales, ...nuevosPlatos];
    usuario.favoritos = usuario.favoritos.filter(
      (platoId) => !platosARemover.includes(platoId)
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
        producto._id === productoID && producto.precio === nuevoProducto.precio
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

export const editarUsuario = async (usuario, id) => {
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
    await actualizarPedidosUsuario(usuarioID, usuario.pedidos);

    return usuario.pedidos;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const actualizarStockProducto = async (id, cantidad) => {
  try {
    const producto = await obtenerPlato(id);

    if (!producto) {
      throw new Error("Producto no encontrado.");
    }

    producto.stock += cantidad;

    await editarPlato(producto, id);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const actualizarPedidosUsuario = async (idUsuario, nuevosPedidos) => {
  try {
    const usuario = await obtenerUsuario(idUsuario);

    if (!usuario) {
      throw new Error("Usuario no encontrado.");
    }

    const pedidosUsuario = nuevosPedidos.filter(
      (pedido) => pedido.email === usuario.email
    );

    usuario.pedidos = pedidosUsuario;

    await editarUsuario(usuario, idUsuario);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const modificarEstadoUsuario = async (id, estado) => {
  try {
    const usuario = await obtenerUsuario(id);
    if (!usuario) {
      throw new Error("Usuario no encontrado.");
    }

    usuario.estado = estado;

    await editarUsuario(usuario, id);
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
