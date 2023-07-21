const ItemUsuario = ({ data }) => {
  return (
    <tbody>
      {data.map((item) => (
        <tr key={item.id}>
          <td className="align-middle contenedor_imagen">
            <div className="imagen_tabla">
              {/* <img src={item.image} alt={item.nombre} className="w-100 h-100" /> */}
            </div>
          </td>
          <td className="align-middle">{item.email}</td>
          <td className="align-middle">{item.nombre}</td>
          <td className="align-middle">{item.rol}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default ItemUsuario;
