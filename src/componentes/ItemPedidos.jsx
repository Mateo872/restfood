import { BsClockHistory } from "react-icons/bs";

const ItemPedidos = ({ dataPedidos }) => {
  return (
    <tbody>
      {dataPedidos.map((item) => (
        <tr key={item.id}>
          <td className="item_tabla align-middle py-2">{item.email}</td>
          <td className="item_tabla align-middle py-2">{item.nombre}</td>
          <td className="align-middle w-75 py-2">{item.rol}</td>
          <td className="align-middle py-2">
            <div className="pendiente_contenedor d-flex justify-content-center align-items-center">
              <BsClockHistory size={20} />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default ItemPedidos;
