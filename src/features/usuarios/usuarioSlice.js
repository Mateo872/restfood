import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usuarios: [],
  usuario: {
    nombre: "",
    email: "",
    contrasenia: "",
    imagen: "",
    estado: "activo",
    rol: "usuario",
    pedidos: [],
    favoritos: [],
    carrito: [],
  },
};

export const usuarioSlice = createSlice({
  name: "usuarios",
  initialState,
  reducers: {
    usuarios: (estado, accion) => {
      estado.usuarios = accion.payload;
      // estado.usuarios.push(accion.payload);
    },
    agregarUsuario: (estado, accion) => {
      estado.usuario = accion.payload;
    },
    editarUsuario: (estado, accion) => {
      const {
        _id,
        nombre,
        email,
        contrasenia,
        imagen,
        estado: estadoUsuario,
        rol,
        pedidos,
        favoritos,
        carrito,
      } = accion.payload;

      const usuarioEncontrado = estado.usuarios.find(
        (usuario) => usuario._id === _id
      );

      if (usuarioEncontrado) {
        usuarioEncontrado.nombre = nombre;
        usuarioEncontrado.email = email;
        usuarioEncontrado.contrasenia = contrasenia;
        usuarioEncontrado.imagen = imagen;
        usuarioEncontrado.estado = estadoUsuario;
        usuarioEncontrado.rol = rol;
        usuarioEncontrado.pedidos = pedidos;
        usuarioEncontrado.favoritos = favoritos;
        usuarioEncontrado.carrito = carrito;
      }
    },
  },
});

export const { usuarios, agregarUsuario, editarUsuario } = usuarioSlice.actions;
export default usuarioSlice.reducer;
