import { BsLockFill, BsPause, BsX } from "react-icons/bs";
import { editarUsuario, eliminarUsuario } from "./ayudas/consultas";
import { useDispatch } from "react-redux";
import { usuarios as usuariosState } from "../features/usuarios/usuarioSlice";
import Swal from "sweetalert2";
import { Usuario } from "../types/types";

interface Props {
  usuarios: Usuario[];
  setActualizar: (arg: boolean) => void;
  actualizar: boolean;
}

const ItemUsuario = ({ usuarios, setActualizar, actualizar }: Props) => {
  const admin = usuarios.filter((item) => item.rol === "administrador");
  const usuarioNormal = usuarios.filter((item) => item.rol !== "administrador");
  const dispatch = useDispatch();
  const usuariosOrdenados = [...admin, ...usuarioNormal];

  const manejoSuspenso = async (id: string) => {
    const usuario = usuarios.find((item) => item._id === id);

    try {
      const result = await Swal.fire({
        title: `¿Estás seguro de ${
          usuario?.estado === "suspendido" ? "habilitar" : "suspender"
        } el usuario?`,
        text: `Se ${
          usuario?.estado === "suspendido" ? "habilitará" : "suspenderá"
        } el usuario '${usuario?.nombre}'.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText:
          usuario?.estado === "suspendido" ? "Habilitar" : "Suspender",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        const usuarioEditado = {
          ...usuario,
          estado: usuario?.estado === "suspendido" ? "activo" : "suspendido",
        };

        await editarUsuario(usuarioEditado, id);

        const mensaje =
          usuario?.estado === "suspendido"
            ? `Usuario habilitado: ${usuario?.nombre}`
            : `Usuario suspendido: ${usuario?.nombre}`;

        Swal.fire("Éxito", mensaje, "success");

        setActualizar(!actualizar);
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al cambiar el estado del usuario?.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const manejoEliminarUsuario = (id: string) => {
    const admin =
      usuarios.find((usuario) => usuario?._id === id)?.rol === "administrador";

    if (admin) {
      return;
    }

    const usuario = usuarios.find((item) => item._id === id);
    Swal.fire({
      title: `¿Estás seguro de eliminar el usuario?`,
      text: `Se eliminará el usuario '${usuario?.nombre}'.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          Swal.fire(
            `Usuario eliminado`,
            `El usuario ${usuario?.nombre} fue eliminado.`,
            "success"
          );
          eliminarUsuario(id);

          const nuevosUsuarios = usuarios.filter(
            (usuario) => usuario?._id !== id
          );

          dispatch(usuariosState(nuevosUsuarios));
        } catch (error) {
          console.log(error);
          Swal.fire({
            title: "Error",
            text: "Ocurrió un error al eliminar el usuario?.",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      }
    });
  };

  return (
    <tbody>
      {usuariosOrdenados.map((item) => (
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
                  usuarios.find((usuario) => usuario?._id === item._id)
                    ?.estado === "suspendido"
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
