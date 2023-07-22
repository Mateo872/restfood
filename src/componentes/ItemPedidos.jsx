import { BsCheck, BsClockHistory } from "react-icons/bs";

const ItemPedidos = ({ dataPedidos }) => {
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
              <div className="pendiente_contenedor d-flex justify-content-center align-items-center">
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
