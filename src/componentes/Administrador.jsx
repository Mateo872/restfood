import { useEffect, useState } from "react";
import ItemProducto from "./ItemProducto";
import ItemUsuario from "./ItemUsuario";
import ItemPedidos from "./ItemPedidos";
import { Link } from "react-router-dom";
import {
  borrarPlatos,
  editarUsuario,
  obtenerUsuarios,
} from "./ayudas/consultas";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { usuarios } from "../features/usuarios/usuarioSlice";
import { editarUsuario as editarUsuarioState } from "../features/usuarios/usuarioSlice";
import { setActualizar as setActualizarState } from "../features/actualizar/actualizarSlice";

const Administrador = () => {
  const [input, setInput] = useState("");
  const [seleccion, setSeleccion] = useState(false);
  const [seleccionados, setSeleccionados] = useState([]);
  const [dataPedidos, setDataPedidos] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [actualizar, setActualizar] = useState(false);
  const usuariosState = useSelector((state) => state.usuarios.usuarios);
  const productosState = useSelector((state) => state.productos.productos);
  const actualizarState = useSelector((state) => state.actualizar.actualizar);
  const dispatch = useDispatch();

  useEffect(() => {
    const todosPedidos = [];

    usuariosState?.forEach((usuario) => {
      if (usuario.pedidos && usuario.pedidos.length > 0) {
        todosPedidos.push(...usuario.pedidos);
      }
    });

    setDataPedidos(todosPedidos);
  }, [usuariosState]);

  const fetchUsuarios = async () => {
    try {
      const respuesta = await obtenerUsuarios();
      dispatch(usuarios(respuesta));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, [actualizar]);

  const eliminarProductos = () => {
    if (seleccionados.length > 0) {
      Swal.fire({
        title: "¿Estás seguro de eliminar los productos?",
        text: "Este paso no se puede revertir.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Borrar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          borrarPlatos(seleccionados)
            .then((respuestas) => {
              if (respuestas.every((res) => res.status === 200)) {
                Swal.fire(
                  "Productos eliminados con éxito!",
                  "Los productos fueron eliminados.",
                  "success"
                ).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(setActualizarState(!actualizarState));
                    setInput("");
                  }
                });
              } else {
                Swal.fire(
                  "Se produjo un error",
                  "Intente realizar esta operación más tarde.",
                  "error"
                );
              }
            })
            .catch((error) => {
              console.log(error);
              Swal.fire(
                "Se produjo un error",
                "Intente realizar esta operación más tarde.",
                "error"
              );
            });
        }
      });
    } else {
      Swal.fire(
        "No hay productos seleccionados",
        "Seleccione los productos que desea eliminar.",
        "error"
      );
    }
  };

  const manejoBuscador = (e) => {
    setInput(e.target.value);
    setSpinner(true);
    setTimeout(() => {
      setSpinner(false);
    }, 400);
  };

  const platosFiltrados = productosState.filter((producto) =>
    producto.nombre.toLowerCase().includes(input.toLowerCase())
  );

  const eliminarPedidos = () => {
    Swal.fire({
      title: "¿Estás seguro de eliminar todos los pedidos?",
      text: "Este paso no se puede revertir.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const pedidosActualizados = dataPedidos.filter(
            (pedido) => pedido.estado !== "Realizado"
          );

          setDataPedidos(pedidosActualizados);

          for (const usuario of usuarios) {
            const usuarioEditado = {
              ...usuario,
              pedidos: [],
            };
            editarUsuario(usuarioEditado, usuario._id);
            dispatch(
              editarUsuarioState({
                ...usuario,
                pedidos: [],
              })
            );
          }

          Swal.fire(
            "Pedidos eliminados con éxito!",
            "Los pedidos fueron eliminados.",
            "success"
          );
        } catch (error) {
          console.log(error);
          Swal.fire(
            "Se produjo un error",
            "Intente realizar esta operación más tarde.",
            "error"
          );
        }
      }
    });
  };

  return (
    <div className="fondo">
      <section className="text-white text-center p-5 mt-5">
        <h1>Hola, Rolling</h1>
        <p>Como administrador, tus responsabilidades pueden incluir:</p>
        <ol>
          <li className="text-center">Administrar los usuarios.</li>
          <li className="text-center">Supervisar los productos.</li>
          <li className="text-center">Controlar los pedidos.</li>
        </ol>
      </section>
      <section className="text-white bg-dark contenedorAdministracion">
        <article>
          <div className="botones d-flex justify-content-end mb-3">
            <input
              type="text"
              placeholder="Busca tus productos"
              onChange={manejoBuscador}
              value={input}
              className="input_menu"
            />
          </div>
          <div className="botones d-flex align-items-center justify-content-between mb-3 mb-lg-5">
            <h2 className="admin_titulo mb-0">Productos</h2>
            <div className="d-flex align-items-center gap-1 w-100 justify-content-end">
              <button
                className="boton_admin boton_seleccionar"
                onClick={() => {
                  setSeleccion(!seleccion);
                  !seleccion && setSeleccionados([]);
                }}
              >
                {seleccion ? "Cancelar" : "Seleccionar"}
              </button>
              {!seleccion ? (
                <Link
                  to={"/administrador/producto/crear"}
                  className="boton_admin boton_agregar"
                >
                  Agregar
                </Link>
              ) : (
                <button
                  className="boton_admin boton_eliminar-todos"
                  onClick={eliminarProductos}
                >
                  Eliminar
                </button>
              )}
            </div>
          </div>
          <div
            className="row row-cols-sm-1 row-cols-md-3 contenedorProductos"
            style={{
              justifyContent:
                platosFiltrados.length < 3 && platosFiltrados.length !== 0
                  ? "center"
                  : "space-between",
              height: platosFiltrados.length < 6 ? "auto" : spinner && "4rem",
            }}
          >
            {spinner ? (
              <div className="d-flex justify-content-center w-100">
                <ClipLoader color="#ffffff" loading={spinner} size={35} />
              </div>
            ) : platosFiltrados.length > 0 ? (
              platosFiltrados.map((plato) => (
                <ItemProducto
                  key={plato._id}
                  platos={plato}
                  setInput={setInput}
                  seleccion={seleccion}
                  seleccionados={seleccionados}
                  setSeleccionados={setSeleccionados}
                />
              ))
            ) : (
              <p className="botones">No hay productos</p>
            )}
          </div>
        </article>
        <article className="botones my-5">
          <h2 className="admin_titulo mb-3">Usuarios</h2>
          <div className="tabla_contenedor">
            <table className="tabla">
              <thead>
                <tr>
                  <th className="py-2">Imágen</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Nombre</th>
                  <th className="py-2">Rol</th>
                  <th className="py-2">Suspender</th>
                  <th className="py-2">Eliminar</th>
                </tr>
              </thead>
              <ItemUsuario
                usuarios={usuariosState}
                setActualizar={setActualizar}
                actualizar={actualizar}
              />
            </table>
          </div>
        </article>
        {dataPedidos.length > 0 && (
          <article className="botones my-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="admin_titulo mb-0">Pedidos</h2>
              {dataPedidos.filter((pedido) => pedido.estado === "Realizado")
                .length > 0 && (
                <button
                  className="boton_admin boton_eliminar-todos"
                  onClick={eliminarPedidos}
                >
                  Eliminar todos
                </button>
              )}
            </div>
            <div className="tabla_contenedor">
              <table className="tabla">
                <thead>
                  <tr>
                    <th className="py-2">Email de usuario</th>
                    <th className="py-2">Nombre</th>
                    <th className="py-2">Estado</th>
                    <th className="py-2">Fecha</th>
                    <th className="py-2">Acciones</th>
                  </tr>
                </thead>
                <ItemPedidos
                  usuarios={usuariosState}
                  dataPedidos={dataPedidos}
                  setDataPedidos={setDataPedidos}
                />
              </table>
            </div>
          </article>
        )}
      </section>
    </div>
  );
};

export default Administrador;
