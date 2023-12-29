import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Producto } from "../../types/types";

interface Props {
  productos: Producto[];
  producto: Omit<Producto, "_id">;
}

const initialState: Props = {
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
    productos: (estado, accion: PayloadAction<Producto[]>) => {
      estado.productos = accion.payload;
    },
    agregarProducto: (estado, accion: PayloadAction<Producto>) => {
      estado.productos.push(accion.payload);
    },
    editarProducto: (estado, accion: PayloadAction<Partial<Producto>>) => {
      const { _id, nombre, imagen, precio, descripcion, stock, categoria } =
        accion.payload;

      const productoEncontrado: Producto | undefined = estado.productos.find(
        (prod) => prod._id === _id
      );

      if (productoEncontrado) {
        productoEncontrado.nombre = nombre ?? productoEncontrado.nombre;
        productoEncontrado.imagen = imagen ?? productoEncontrado.imagen;
        productoEncontrado.precio = precio ?? productoEncontrado.precio;
        productoEncontrado.descripcion =
          descripcion ?? productoEncontrado.descripcion;
        productoEncontrado.stock = stock ?? productoEncontrado.stock;
        productoEncontrado.categoria =
          categoria ?? productoEncontrado.categoria;
      }
    },
    eliminarProducto: (estado, accion: PayloadAction<Producto["_id"]>) => {
      const productoEncontrado: Producto | undefined = estado.productos.find(
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
