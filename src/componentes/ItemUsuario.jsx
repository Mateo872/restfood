import { useState } from "react";
import { BsPause } from "react-icons/bs";
import Swal from "sweetalert2";

const ItemUsuario = ({ data }) => {
  const [usuariosSuspendidos, setUsuariosSuspendidos] = useState([]);

  const manejoSuspenso = (id) => {
    const usuario = data.find((item) => item.id === id);
    const suspendido = usuariosSuspendidos.find((usuario) => usuario.id === id);

    Swal.fire({
      title: `¿Estás seguro de ${
        suspendido ? "habilitar" : "suspender"
      } el usuario?`,
      text: `Se ${suspendido ? "habilitará" : "suspenderá"} el usuario '${
        usuario.nombre
      }'.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: suspendido ? "Habilitar" : "Suspender",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        if (suspendido) {
          setUsuariosSuspendidos(
            usuariosSuspendidos.filter((usuario) => usuario.id !== id)
          );
        } else {
          setUsuariosSuspendidos([...usuariosSuspendidos, usuario]);
        }
      }
    });
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item.id}>
          <td className="align-middle contenedor_imagen">
            <div
              className="imagen_tabla"
              style={{ backgroundImage: `url(${item.imagen})` }}
            ></div>
          </td>
          <td className="align-middle item_tabla">{item.email}</td>
          <td className="align-middle item_tabla">{item.nombre}</td>
          <td className="align-middle w-75">{item.rol}</td>
          <td className="align-middle">
            <div
              className={`pausa_contenedor d-flex justify-content-center align-items-center ${
                usuariosSuspendidos.find((usuario) => usuario.id === item.id)
                  ? "suspendido"
                  : "suspender"
              }`}
              onClick={() => manejoSuspenso(item.id)}
            >
              <BsPause size={30} />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default ItemUsuario;
