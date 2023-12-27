import { configureStore } from "@reduxjs/toolkit";
import usuariosReducer from "../features/usuarios/usuarioSlice";
import productosReducer from "../features/productos/productosSlice";
import cargaReducer from "../features/carga/cargaSlice";
import actualizarReducer from "../features/actualizar/actualizarSlice";

export const store = configureStore({
  reducer: {
    usuarios: usuariosReducer,
    productos: productosReducer,
    carga: cargaReducer,
    actualizar: actualizarReducer,
  },
});
