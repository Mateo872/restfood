import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Usuario } from "../../types/types";

interface Props {
  usuarios: Usuario[];
  usuario: Omit<Usuario, "_id">;
}

const initialState: Props = {
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
    usuarios: (estado, accion: PayloadAction<Usuario[]>) => {
      estado.usuarios = accion.payload;
    },
    agregarUsuario: (estado, accion: PayloadAction<Usuario>) => {
      estado.usuario = accion.payload;
    },
    editarUsuario: (estado, accion: PayloadAction<Partial<Usuario>>) => {
      const {
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

      const usuarioEncontrado = estado.usuario;

      if (usuarioEncontrado) {
        usuarioEncontrado.nombre = nombre ?? usuarioEncontrado.nombre;
        usuarioEncontrado.email = email ?? usuarioEncontrado.email;
        usuarioEncontrado.contrasenia =
          contrasenia ?? usuarioEncontrado.contrasenia;
        usuarioEncontrado.imagen = imagen ?? usuarioEncontrado.imagen;
        usuarioEncontrado.estado = estadoUsuario ?? usuarioEncontrado.estado;
        usuarioEncontrado.rol = rol ?? usuarioEncontrado.rol;
        usuarioEncontrado.pedidos = pedidos ?? usuarioEncontrado.pedidos;
        usuarioEncontrado.favoritos = favoritos ?? usuarioEncontrado.favoritos;
        usuarioEncontrado.carrito = carrito ?? usuarioEncontrado.carrito;
      }
    },
  },
});

export const { usuarios, agregarUsuario, editarUsuario } = usuarioSlice.actions;
export default usuarioSlice.reducer;
