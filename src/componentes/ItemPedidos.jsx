import { useState } from "react";
import { BsCheck, BsClockHistory } from "react-icons/bs";
import Swal from "sweetalert2";

const ItemPedidos = () => {
  const [dataPedidos, setDataPedidos] = useState([
    {
      id: 1,
      email: "correo1@example.com",
      nombre: "Hamburguesa doble",
      fecha: "11/07/2023",
      estado: "Pendiente",
    },
    {
      id: 2,
      email: "correo2@example.com",
      nombre: "Bocadillos de Tofu a la Barbacoa",
      fecha: "11/07/2023",
      estado: "Pendiente",
    },
  ]);

  const manejoPedido = (id) => {
    const pedido = dataPedidos.find((item) => item.id === id);
    const pedidoIndex = dataPedidos.findIndex((item) => item.id === id);

    Swal.fire({
      title: `¿Estás seguro de realizar el pedido?`,
      text: `Se realizará el pedido '${pedido.nombre}'.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const dataPedidosActualizado = [...dataPedidos];
        dataPedidosActualizado[pedidoIndex] = {
          ...pedido,
          estado: "Realizado",
        };
        setDataPedidos(dataPedidosActualizado);
      }
    });
  };

  return (
    <tbody>
      {dataPedidos.map((item) => (
        <tr key={item.id}>
          <td className="item_tabla align-middle py-2">{item.email}</td>
          <td className="item_tabla align-middle py-2">{item.nombre}</td>
          <td className="align-middle w-50 py-2">{item.estado}</td>
          <td className="align-middle w-50 py-2">{item.fecha}</td>
          <td className="align-middle py-2">
            {item.estado === "Pendiente" ? (
              <div
                className="pendiente_contenedor d-flex justify-content-center align-items-center"
                onClick={() => manejoPedido(item.id)}
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
