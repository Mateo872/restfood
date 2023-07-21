import { BsPause } from "react-icons/bs";

const ItemUsuario = ({ data }) => {
  return (
    <tbody>
      {data.map((item) => (
        <tr key={item.id}>
          <td className="align-middle contenedor_imagen">
            <div className="imagen_tabla">
              {/* <img src={item.imagen} alt={item.nombre} className="w-100 h-100" /> */}
            </div>
          </td>
          <td className="align-middle item_tabla">{item.email}</td>
          <td className="align-middle item_tabla">{item.nombre}</td>
          <td className="align-middle w-75">{item.rol}</td>
          <td className="align-middle">
            <div className="pausa_contenedor d-flex justify-content-center align-items-center">
              <BsPause size={30} />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default ItemUsuario;
