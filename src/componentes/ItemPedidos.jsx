import { useState, useEffect } from "react";
import { BsCheck, BsClockHistory } from "react-icons/bs";
import Swal from "sweetalert2";
import { actualizarPedidosUsuario } from "./ayudas/consultas";

const ItemPedidos = ({ usuarios, dataPedidos, setDataPedidos }) => {
  const [usuariosDB, setUsuariosDB] = useState([]);

  useEffect(() => {
    setUsuariosDB(usuarios);
  }, [usuarios]);

  const manejoPedido = (id) => {
    const pedido = dataPedidos.find((item) => item._id === id);
    const pedidoIndex = dataPedidos.findIndex((item) => item._id === id);

    Swal.fire({
      title: `¿Estás seguro de realizar el pedido?`,
      text: `Se ${
        pedido.nombresProductos.length > 1 ? "realizarán" : "realizará"
      } ${pedido.nombresProductos.length > 1 ? "los" : "el"} ${
        pedido.nombresProductos.length > 1 ? "pedidos" : "pedido"
      } '${pedido.nombresProductos}'.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const dataPedidosActualizado = [...dataPedidos];
          dataPedidosActualizado[pedidoIndex].estado = "Realizado";

          setDataPedidos(dataPedidosActualizado);
          const usuarioEmail = pedido.email;
          const usuarioEncontrado = usuariosDB.find(
            (usuario) => usuario.email === usuarioEmail
          );

          if (!usuarioEncontrado) {
            throw new Error("Usuario no encontrado.");
          }

          const usuarioID = usuarioEncontrado._id;

          await actualizarPedidosUsuario(usuarioID, dataPedidosActualizado);

          Swal.fire(
            "Pedido realizado",
            `Se realizó el pedido '${pedido.nombresProductos}' con éxito.`,
            "success"
          );
        } catch (error) {
          console.log(error);
          Swal.fire({
            title: "Error",
            text: "Ocurrió un error al realizar el pedido.",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      }
    });
  };
  const eliminarPedido = (idPedido) => {
    Swal.fire({
      title: "¿Estás seguro de eliminar el pedido?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const pedidoAEliminar = dataPedidos.find(
            (pedido) => pedido._id === idPedido
          );
          if (!pedidoAEliminar) {
            throw new Error("Pedido no encontrado.");
          }

          const pedidosActualizados = dataPedidos.filter(
            (pedido) => pedido._id !== idPedido
          );
          setDataPedidos(pedidosActualizados);

          const usuarioEncontrado = usuariosDB.find(
            (usuario) => usuario.email === pedidoAEliminar.email
          );

          if (!usuarioEncontrado) {
            throw new Error("Usuario no encontrado.");
          }

          await actualizarPedidosUsuario(
            usuarioEncontrado._id,
            pedidosActualizados
          );

          Swal.fire(
            "Pedido eliminado",
            "El pedido ha sido eliminado correctamente.",
            "success"
          );
        } catch (error) {
          console.log(error);
          Swal.fire({
            title: "Error",
            text: "Ocurrió un error al eliminar el pedido.",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      }
    });
  };

  return (
    <tbody>
      {dataPedidos?.map((pedido, index) => (
        <tr key={index}>
          <td className="item_tabla align-middle py-2">{pedido.email}</td>
          <td className="item_tabla align-middle py-2">
            {Array.isArray(pedido.nombresProductos)
              ? pedido.nombresProductos.join(", ")
              : pedido.nombresProductos}
          </td>
          <td className="align-middle w-50 py-2">{pedido.estado}</td>
          <td className="align-middle w-50 py-2">{pedido.fecha}</td>
          <td className="align-middle py-2">
            {pedido.estado === "Pendiente" ? (
              <div
                className="pendiente_contenedor d-flex justify-content-center align-items-center"
                onClick={() => manejoPedido(pedido._id)}
              >
                <BsClockHistory size={20} />
              </div>
            ) : (
              <div className="check_contenedor d-flex justify-content-center align-items-center">
                <BsCheck size={20} onClick={() => eliminarPedido(pedido._id)} />
              </div>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default ItemPedidos;
