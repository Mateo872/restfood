import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productos: [],
  producto: {
    nombre: "",
    imagen: "",
    precio: 0,
    descripcion: "",
    stock: 0,
    categoria: "",
  },
};

export const productosSlice = createSlice({
  name: "productos",
  initialState,
  reducers: {
    productos: (estado, accion) => {
      estado.productos = accion.payload;
    },
    agregarProducto: (estado, accion) => {
      estado.productos.push(accion.payload);
    },
    editarProducto: (estado, accion) => {
      const { _id, nombre, imagen, precio, descripcion, stock, categoria } =
        accion.payload;

      const productoEncontrado = estado.productos.find(
        (prod) => prod._id === _id
      );

      if (productoEncontrado) {
        productoEncontrado.nombre = nombre;
        productoEncontrado.nombre = imagen;
        productoEncontrado.nombre = precio;
        productoEncontrado.nombre = descripcion;
        productoEncontrado.nombre = stock;
        productoEncontrado.nombre = categoria;
      }
    },
    eliminarProducto: (estado, accion) => {
      const productoEncontrado = estado.productos.find(
        (prod) => prod._id === accion.payload
      );
      if (productoEncontrado) {
        estado.productos = estado.productos.filter(
          (prod) => prod._id !== accion.payload
        );
      }
    },
  },
});

export const { productos, agregarProducto, editarProducto, eliminarProducto } =
  productosSlice.actions;
export default productosSlice.reducer;
