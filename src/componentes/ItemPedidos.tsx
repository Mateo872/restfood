import { BsCheck, BsClockHistory } from "react-icons/bs";
import Swal from "sweetalert2";
import { editarUsuario } from "./ayudas/consultas";
import { editarUsuario as editarUsuarioState } from "../features/usuarios/usuarioSlice";
import { Pedidos, Usuario } from "../types/types";
import { useDispatch } from "react-redux";

interface Props {
  usuarios: Usuario[];
  dataPedidos: Pedidos[];
  setDataPedidos: (pedidos: Pedidos[]) => void;
}

const ItemPedidos = ({ usuarios, dataPedidos, setDataPedidos }: Props) => {
  const dispatch = useDispatch();

  const manejoPedido = (id: number) => {
    const pedido = dataPedidos.find((item) => item.id === id);
    const pedidoIndex = dataPedidos.findIndex((item) => item.id === id);

    Swal.fire({
      title: `¿Estás seguro de realizar el pedido?`,
      text: `Se ${
        pedido && pedido?.nombresProductos?.length > 1
          ? "realizarán"
          : "realizará"
      } ${pedido && pedido?.nombresProductos?.length > 1 ? "los" : "el"} ${
        pedido && pedido?.nombresProductos?.length > 1 ? "pedidos" : "pedido"
      } '${pedido?.nombresProductos}'.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const dataPedidosActualizado = [...dataPedidos];
          dataPedidosActualizado[pedidoIndex] = {
            ...dataPedidosActualizado[pedidoIndex],
            estado: "Realizado",
          };

          setDataPedidos(dataPedidosActualizado);

          const usuarioEmail = pedido?.email;
          const usuarioEncontrado = usuarios.find(
            (usuario) => usuario.email === usuarioEmail
          );

          if (!usuarioEncontrado) {
            throw new Error("Usuario no encontrado.");
          }

          const usuarioID = usuarioEncontrado._id;

          const usuarioEditado = {
            ...usuarioEncontrado,
            pedidos: dataPedidosActualizado,
          };

          editarUsuario(usuarioEditado, usuarioID);

          dispatch(editarUsuarioState(usuarioEditado));

          Swal.fire(
            "Pedido realizado",
            `Se realizó el pedido '${pedido?.nombresProductos}' con éxito.`,
            "success"
          );
        } catch (error) {
          console.log(error);
          Swal.fire({
            title: "Error",
            text: "Ocurrió un error al realizar el pedido?.",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      }
    });
  };

  const eliminarPedido = (idPedido: number) => {
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
            (pedido) => pedido?.id === idPedido
          );
          if (!pedidoAEliminar) {
            throw new Error("Pedido no encontrado.");
          }

          const pedidosActualizados = dataPedidos.filter(
            (pedido) => pedido?.id !== idPedido
          );
          setDataPedidos(pedidosActualizados);

          const usuarioEncontrado = usuarios.find(
            (usuario) => usuario.email === pedidoAEliminar.email
          );

          if (!usuarioEncontrado) {
            throw new Error("Usuario no encontrado.");
          }

          const usuarioEditado = {
            ...usuarioEncontrado,
            pedidos: pedidosActualizados,
          };

          editarUsuario(usuarioEditado, usuarioEncontrado._id);

          Swal.fire(
            "Pedido eliminado",
            "El pedido ha sido eliminado correctamente.",
            "success"
          );
        } catch (error) {
          console.log(error);
          Swal.fire({
            title: "Error",
            text: "Ocurrió un error al eliminar el pedido?.",
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
          <td className="item_tabla align-middle py-2">{pedido?.email}</td>
          <td className="item_tabla align-middle py-2">
            {Array.isArray(pedido?.nombresProductos)
              ? pedido?.nombresProductos?.join(", ")
              : pedido?.nombresProductos}
          </td>
          <td className="align-middle w-50 py-2">{pedido?.estado}</td>
          <td className="align-middle w-50 py-2">{pedido?.fecha}</td>
          <td className="align-middle py-2">
            {pedido?.estado === "Pendiente" ? (
              <div
                className="pendiente_contenedor d-flex justify-content-center align-items-center"
                onClick={() => manejoPedido(pedido?.id)}
              >
                <BsClockHistory size={20} />
              </div>
            ) : (
              <div className="check_contenedor d-flex justify-content-center align-items-center">
                <BsCheck size={20} onClick={() => eliminarPedido(pedido?.id)} />
              </div>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default ItemPedidos;
