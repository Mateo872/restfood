import { BsTrash } from "react-icons/bs";
import Swal from "sweetalert2";
import { editarPlato, editarUsuario } from "./ayudas/consultas";
import { useDispatch, useSelector } from "react-redux";
import { editarProducto } from "../features/productos/productosSlice";
import { editarUsuario as editarUsuarioState } from "../features/usuarios/usuarioSlice";
import { UsuariosState } from "../types/types";

type CarritoItemProps = {
  producto: {
    _id: string;
    nombre: string;
    imagen: string;
    precio: number;
    cantidad: string | number;
  };
};

const CarritoItem = ({ producto }: CarritoItemProps) => {
  const usuarioState = useSelector(
    (state: UsuariosState) => state.usuarios.usuario
  );
  const dispatch = useDispatch();

  const eliminarProducto = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El producto se eliminará del carrito",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const carritoActualizado = usuarioState?.carrito.filter(
          (prod) => prod._id !== producto._id || prod.precio !== producto.precio
        );

        Swal.fire(
          "Producto eliminado",
          "El producto se eliminó correctamente",
          "success"
        ).then(async () => {
          editarPlato({ ...producto, stock: producto.cantidad }, producto?._id);
          dispatch(editarProducto({ ...producto, stock: producto.cantidad }));

          const usuarioActualizado = {
            ...usuarioState,
            carrito: carritoActualizado,
          };

          editarUsuario(usuarioActualizado, usuarioState._id);
          dispatch(
            editarUsuarioState({
              ...usuarioState,
              carrito: [],
            })
          );
        });
      }
    });
  };
  const { nombre, precio, imagen, cantidad } = producto;

  return (
    <div className="contenedor_producto-carrito d-flex justify-content-between align-items-center">
      <div
        className="contenedor_imagen"
        style={{ backgroundImage: `url(${imagen})` }}
      ></div>
      <div className="carrito_caracteristicas carac_titulo d-flex flex-column">
        <h6 className="title">Título</h6>
        <h6 className="subtitle mb-0" title={nombre}>
          {nombre}
        </h6>
      </div>
      <div className="carrito_caracteristicas d-flex flex-column">
        <h6 className="title">Cantidad</h6>
        <h6 className="subtitle mb-0">{cantidad}</h6>
      </div>
      <div className="carrito_caracteristicas d-flex flex-column">
        <h6 className="title">Precio</h6>
        <h6 className="subtitle mb-0">${precio}</h6>
      </div>
      <div className="carrito_caracteristicas d-flex flex-column">
        <h6 className="title">Subtotal</h6>
        <h6 className="subtitle mb-0">${+precio * +cantidad}</h6>
      </div>
      <BsTrash onClick={eliminarProducto} />
    </div>
  );
};

export default CarritoItem;
