import { BsLockFill, BsPause, BsX } from "react-icons/bs";
import {
  eliminarUsuario,
  modificarEstadoUsuario,
  obtenerUsuarios,
} from "./ayudas/consultas";
import Swal from "sweetalert2";

const ItemUsuario = ({ usuarios, setUsuarios }) => {
  const manejoSuspenso = async (id) => {
    const usuario = usuarios.find((item) => item._id === id);
    Swal.fire({
      title: `¿Estás seguro de ${
        usuarios.find((usuario) => usuario._id === id).estado === "suspendido"
          ? "habilitar"
          : "suspender"
      } el usuario?`,
      text: `Se ${
        usuarios.find((usuario) => usuario._id === id).estado === "suspendido"
          ? "habilitará"
          : "suspenderá"
      } el usuario '${usuario.nombre}'.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText:
        usuarios.find((usuario) => usuario._id === id).estado === "suspendido"
          ? "Habilitar"
          : "Suspender",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (
            usuarios.find((usuario) => usuario._id === id).estado ===
            "suspendido"
          ) {
            Swal.fire(
              `Usuario habilitado`,
              `El usuario ${usuario.nombre} fue habilitado.`,
              "success"
            );
            await modificarEstadoUsuario(id, "activo");
          } else {
            Swal.fire(
              `Usuario suspendido`,
              `El usuario ${usuario.nombre} fue suspendido.`,
              "success"
            );
            await modificarEstadoUsuario(id, "suspendido");
          }
        } catch (error) {
          console.log(error);
          Swal.fire({
            title: "Error",
            text: "Ocurrió un error al cambiar el estado del usuario.",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      }
    });
  };

  const manejoEliminarUsuario = (id) => {
    const admin =
      usuarios.find((usuario) => usuario._id === id).rol === "administrador";

    if (admin) {
      return;
    }

    const usuario = usuarios.find((item) => item._id === id);
    Swal.fire({
      title: `¿Estás seguro de eliminar el usuario?`,
      text: `Se eliminará el usuario '${usuario.nombre}'.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          Swal.fire(
            `Usuario eliminado`,
            `El usuario ${usuario.nombre} fue eliminado.`,
            "success"
          );
          await eliminarUsuario(id);
          obtenerUsuarios().then((data) => {
            setUsuarios(data);
          });
        } catch (error) {
          console.log(error);
          Swal.fire({
            title: "Error",
            text: "Ocurrió un error al eliminar el usuario.",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      }
    });
  };

  return (
    <tbody>
      {usuarios.map((item) => (
        <tr key={item._id}>
          <td className="align-middle contenedor_imagen">
            <div
              className="imagen_tabla"
              style={{ backgroundImage: `url(${item.imagen})` }}
            ></div>
          </td>
          <td className="align-middle item_tabla">{item.email}</td>
          <td className="align-middle item_tabla">{item.nombre}</td>
          <td className="align-middle w-75">
            {item.rol === "usuario" ? "Usuario" : "Administrador"}
          </td>
          <td className="align-middle">
            {item.rol !== "administrador" ? (
              <div
                className={`pausa_contenedor d-flex justify-content-center align-items-center ${
                  usuarios.find((usuario) => usuario._id === item._id)
                    .estado === "suspendido"
                    ? "suspendido"
                    : "suspender"
                }`}
                onClick={() => manejoSuspenso(item._id)}
              >
                <BsPause size={30} />
              </div>
            ) : (
              <div className="pausa_contenedor d-flex justify-content-center align-items-center usuario_activo">
                <BsLockFill size={30} />
              </div>
            )}
          </td>
          <td className="align-middle">
            <div
              className={`pausa_contenedor d-flex justify-content-center align-items-center usuario_eliminar ${
                item.rol === "administrador" && "usuario_admin"
              }`}
            >
              <BsX size={30} onClick={() => manejoEliminarUsuario(item._id)} />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default ItemUsuario;
