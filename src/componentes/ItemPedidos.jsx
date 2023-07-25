import { useState, useEffect } from "react";
import { BsCheck, BsClockHistory } from "react-icons/bs";
import Swal from "sweetalert2";
import { actualizarPedidosUsuario, obtenerUsuario } from "./ayudas/consultas";

const ItemPedidos = ({ usuarios }) => {
  const [usuariosDB, setUsuariosDB] = useState([]);
  const [dataPedidos, setDataPedidos] = useState([]);

  useEffect(() => {
    setUsuariosDB(usuarios);
  }, [usuarios]);

  useEffect(() => {
    const todosPedidos = [];

    usuariosDB.forEach((usuario) => {
      if (usuario.pedidos && usuario.pedidos.length > 0) {
        todosPedidos.push(...usuario.pedidos);
      }
    });

    setDataPedidos(todosPedidos);
  }, [usuariosDB]);

  const manejoPedido = (id) => {
    const pedido = dataPedidos.find((item) => item.id === id);
    const pedidoIndex = dataPedidos.findIndex((item) => item.id === id);

    Swal.fire({
      title: `¿Estás seguro de realizar el pedido?`,
      text: `Se realizará el pedido '${pedido.nombresProductos}'.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const dataPedidosActualizado = [...dataPedidos];
          dataPedidosActualizado[pedidoIndex] = {
            ...pedido,
            estado: "Realizado",
          };
          setDataPedidos(dataPedidosActualizado);

          const usuarioEmail = pedido.email;
          const usuarioEncontrado = usuariosDB.find(
            (usuario) => usuario.email === usuarioEmail
          );

          if (!usuarioEncontrado) {
            throw new Error("Usuario no encontrado.");
          }

          const usuarioID = usuarioEncontrado.id;

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

  return (
    <tbody>
      {dataPedidos.map((pedido, index) => (
        <tr key={index}>
          <td className="item_tabla align-middle py-2">{pedido.email}</td>
          <td className="item_tabla align-middle py-2">
            {pedido.nombresProductos}
          </td>
          <td className="align-middle w-50 py-2">{pedido.estado}</td>
          <td className="align-middle w-50 py-2">{pedido.fecha}</td>
          <td className="align-middle py-2">
            {pedido.estado === "Pendiente" ? (
              <div
                className="pendiente_contenedor d-flex justify-content-center align-items-center"
                onClick={() => manejoPedido(pedido.id)}
              >
                <BsClockHistory size={20} />
              </div>
            ) : (
              <div className="check_contenedor d-flex justify-content-center align-items-center">
                <BsCheck size={20} />
              </div>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default ItemPedidos;
