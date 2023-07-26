import { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import Swal from "sweetalert2";
import { editarUsuario, obtenerUsuario } from "./ayudas/consultas";

const CarritoItem = ({ producto }) => {
  const [usuarioID, setUsuarioID] = useState(null);
  const usuario = JSON.parse(sessionStorage.getItem("usuario")) || null;

  useEffect(() => {
    if (usuario && usuario.id) {
      obtenerUsuario(usuario.id).then((res) => {
        setUsuarioID(res);
      });
    }
  }, [usuarioID]);

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
        const carritoActualizado = usuarioID?.carrito.filter(
          (prod) => prod.id !== producto.id || prod.precio !== producto.precio
        );

        Swal.fire(
          "Producto eliminado",
          "El producto se eliminó correctamente",
          "success"
        ).then(async () => {
          const usuarioActualizado = {
            ...usuarioID,
            carrito: carritoActualizado,
          };

          setUsuarioID(usuarioActualizado);
          await editarUsuario(usuarioActualizado, usuarioID.id);
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
        <h6 className="subtitle mb-0">${precio * cantidad}</h6>
      </div>
      <BsTrash onClick={eliminarProducto} />
    </div>
  );
};

export default CarritoItem;
