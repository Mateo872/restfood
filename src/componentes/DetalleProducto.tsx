import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { BsTruck } from "react-icons/bs";
import { editarPlato, editarUsuario } from "./ayudas/consultas";
import { useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import Error404 from "./Error404";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  agregarUsuario,
  editarUsuario as editarUsuarioState,
} from "../features/usuarios/usuarioSlice";
import { editarProducto } from "../features/productos/productosSlice";
import { Carrito, ProductosState, UsuariosState } from "../types/types";

interface FormValues extends Carrito {
  codigoPostal: number;
  cantidad: string;
}

const DetalleProducto = () => {
  const { id } = useParams();
  const [postal, setPostal] = useState(false);
  const [mostrarSpinner, setMostrarSpinner] = useState(false);
  const [mostrarSpinnerPostal, setMostrarSpinnerPostal] = useState(false);
  const [tamanio, setTamanio] = useState("Chico");
  const [error, setError] = useState(false);
  const [formEnviado, setFormEnviado] = useState<boolean | null>(null);
  const [costoEnvio, setCostoEnvio] = useState(0);
  const [stockOriginal, setStockOriginal] = useState(0);
  const usuarioState = useSelector(
    (state: UsuariosState) => state.usuarios.usuario
  );
  const productosState = useSelector(
    (state: ProductosState) => state.productos.productos
  );
  const plato = productosState.filter((prod) => prod._id === id);
  const [favoritos, setFavoritos] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  useEffect(() => {
    if (plato) {
      setMostrarSpinner(true);
      setTimeout(() => {
        setStockOriginal(Number(plato[0]?.stock || 0));
        setMostrarSpinner(false);
      }, 500);
    } else {
      setMostrarSpinner(false);
      setTimeout(() => {
        setError(true);
      }, 500);
    }
  }, [productosState]);

  useEffect(() => {
    setFavoritos(usuarioState?.favoritos?.includes(plato?.[0]?._id));
    dispatch(agregarUsuario(usuarioState));
  }, [usuarioState.favoritos, plato?.[0]]);

  const manejoSesion = async () => {
    if (usuarioState?.rol !== "administrador") {
      await Swal.fire({
        title: "Inicia sesión para agregar productos al carrito",
        icon: "warning",
        showCancelButton: false,
        confirmButtonText: "OK",
      });
    } else {
      await Swal.fire({
        title: "No puedes agregar productos al carrito siendo administrador",
        icon: "warning",
        showCancelButton: false,
        confirmButtonText: "OK",
      });
    }
    return;
  };

  const manejoFav = () => {
    if (id) {
      const existe = usuarioState?.favoritos?.includes(id);

      try {
        if (!existe) {
          const usuarioEditado = {
            ...usuarioState,
            favoritos: [...usuarioState?.favoritos, id],
          };
          editarUsuario(usuarioEditado, usuarioState._id);
          dispatch(editarUsuarioState(usuarioEditado));
          setFavoritos(!favoritos);
        } else {
          const favoritos = usuarioState?.favoritos?.filter(
            (fav) => fav !== plato[0]?._id
          );
          const usuarioEditado = {
            ...usuarioState,
            favoritos,
          };
          editarUsuario(usuarioEditado, usuarioState._id);
          dispatch(editarUsuarioState(usuarioEditado));
          setFavoritos(!favoritos);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const manejoTamanio = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const nuevoTamanio = e.currentTarget.textContent;
    if (nuevoTamanio) {
      setTamanio(nuevoTamanio);
    }
  };

  const obtenerPrecioConTamanio = () => {
    let precioInicial = plato[0]?.precio;

    if (tamanio === "Mediano") {
      return Math.ceil(precioInicial * 1.2);
    } else if (tamanio === "Grande") {
      return Math.ceil(precioInicial * 1.4);
    }

    return precioInicial;
  };

  const actualizarStock = (cantidad: number) => {
    try {
      const nuevoStock = stockOriginal - cantidad;
      if (nuevoStock >= 0) {
        editarPlato({ ...plato, stock: nuevoStock }, plato[0]?._id);
        dispatch(editarProducto({ ...plato, stock: nuevoStock }));
        setStockOriginal(nuevoStock);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const manejoEnvio = async (data: Carrito) => {
    try {
      if (!formEnviado && !mostrarSpinnerPostal) {
        setMostrarSpinnerPostal(true);
        setTimeout(() => {
          const costoEnvio = Math.floor(Math.random() * 401) + 100;
          setCostoEnvio(costoEnvio);
          setPostal(true);
          setMostrarSpinnerPostal(false);
          setFormEnviado(true);
        }, 1500);
      } else {
        const cantidadSeleccionada = parseInt(data.cantidad);
        if (cantidadSeleccionada > 0) {
          if (cantidadSeleccionada <= stockOriginal) {
            data = {
              _id: plato[0]?._id,
              nombre: plato[0]?.nombre,
              precio: obtenerPrecioConTamanio(),
              cantidad: cantidadSeleccionada.toString(),
              costoEnvio,
              imagen: plato[0]?.imagen,
            };
            Swal.fire({
              title: "¿Querés agregar este producto al carrito?",
              text: "Si no querés, podés cancelar la acción",
              icon: "question",
              showCancelButton: true,
              confirmButtonText: "Sí, agregar",
              cancelButtonText: "No, cancelar",
            }).then((res) => {
              if (res.isConfirmed) {
                actualizarStock(cantidadSeleccionada);
                setTamanio("Chico");
                setPostal(false);
                setCostoEnvio(0);
                setFormEnviado(false);
                const usuarioEditado = {
                  _id: usuarioState._id,
                  nombre: usuarioState.nombre,
                  email: usuarioState.email,
                  contrasenia: usuarioState.contrasenia,
                  imagen: usuarioState.imagen,
                  estado: usuarioState.estado,
                  rol: usuarioState.rol,
                  pedidos: usuarioState.pedidos,
                  favoritos: usuarioState.favoritos,
                  carrito: [...usuarioState?.carrito, data],
                };
                editarUsuario(usuarioEditado, usuarioState._id);
                dispatch(editarUsuarioState(usuarioEditado));
                reset();
              } else {
                setTamanio("Chico");
                setPostal(false);
                setCostoEnvio(0);
                setFormEnviado(false);
                reset();
              }
            });
          } else {
            Swal.fire({
              title: "No hay suficiente stock disponible",
              icon: "warning",
              showCancelButton: false,
              confirmButtonText: "OK",
            });
          }
        } else {
          Swal.fire({
            title: "La cantidad debe ser mayor que cero",
            icon: "warning",
            showCancelButton: false,
            confirmButtonText: "OK",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <article className="contenedor_detalle">
        {mostrarSpinner ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "80vh" }}
          >
            <ClipLoader size={45} />
          </div>
        ) : plato.length > 0 ? (
          <>
            <div className="d-flex gap-1 paginacion">
              <Link to={"/"}>INICIO /</Link>
              <span className="paginacion_detalle">
                {typeof plato[0]?.categoria === "string" &&
                  plato[0]?.categoria?.toUpperCase()}
                /
              </span>
              <span className="paginacion_detalle-color">
                {plato[0]?.nombre?.toUpperCase()}
              </span>
            </div>
            <p className="stock mb-0">
              Stock - <span>{stockOriginal}</span>
            </p>
            <div className="contenedor_imagen-carac d-flex flex-column flex-md-row gap-4">
              <div
                className="contenedor_imagen-detalle position-relative"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${plato[0]?.imagen})`,
                }}
              >
                {usuarioState?.nombre?.length > 0 &&
                  usuarioState?.rol !== "administrador" && (
                    <div onClick={manejoFav}>
                      {favoritos ? (
                        <GoBookmarkFill className="bookmark position-absolute" />
                      ) : (
                        <GoBookmark className="bookmark position-absolute" />
                      )}
                    </div>
                  )}
              </div>
              <form
                onSubmit={handleSubmit(manejoEnvio)}
                className="contenedor_caracteristicas-detalle d-flex flex-column justify-content-lg-between"
              >
                <h2 className="titulo_producto-detalle mt-0">
                  {plato[0]?.nombre}
                </h2>
                <h2 className="titulo_precio-detalle mt-0">
                  ${obtenerPrecioConTamanio()}
                </h2>
                <p className="descripcion_detalle mb-0" title="">
                  {plato[0]?.descripcion}
                </p>
                <h4 className="titulo_tamaño">Tamaño</h4>
                <div className="d-flex flex-column flex-md-row gap-2 align-items-center">
                  <p
                    className={`contenedor_tamanio ${
                      tamanio === "Chico" ? "contenedor_tamanio-activo" : ""
                    }`}
                    onClick={manejoTamanio}
                  >
                    Chico
                  </p>
                  <p
                    className={`contenedor_tamanio ${
                      tamanio === "Mediano" ? "contenedor_tamanio-activo" : ""
                    }`}
                    onClick={manejoTamanio}
                  >
                    Mediano
                  </p>
                  <p
                    className={`contenedor_tamanio ${
                      tamanio === "Grande" ? "contenedor_tamanio-activo" : ""
                    }`}
                    onClick={manejoTamanio}
                  >
                    Grande
                  </p>
                </div>
                <hr />
                <h4>Cantidad</h4>
                <input
                  type="number"
                  className="input_cantidad"
                  placeholder="0"
                  disabled={
                    mostrarSpinnerPostal ||
                    !usuarioState ||
                    usuarioState?.rol === "administrador"
                  }
                  style={{
                    opacity:
                      mostrarSpinnerPostal ||
                      !usuarioState ||
                      usuarioState?.rol === "administrador"
                        ? ".2"
                        : "",
                  }}
                  {...register("cantidad", {
                    required: "La cantidad es obligatoria",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "La cantidad debe ser un número válido",
                    },
                    min: {
                      value: 1,
                      message: "La cantidad debe ser mayor que cero",
                    },
                  })}
                />
                {!usuarioState ||
                  (usuarioState?.rol !== "administrador" && (
                    <div className="text-danger w-75">
                      {errors.cantidad?.message}
                    </div>
                  ))}
                <hr />
                <div className="d-flex align-items-center gap-1 mb-2">
                  <BsTruck className="svg_postal" size={25} />
                  <h4 className="mb-0">Envío</h4>
                </div>
                {!postal ? (
                  <div className="d-flex gap-2 w-100">
                    <input
                      type="text"
                      className="input_postal"
                      placeholder="A2919"
                      disabled={
                        mostrarSpinnerPostal ||
                        !usuarioState ||
                        usuarioState?.rol === "administrador"
                      }
                      style={{
                        opacity:
                          mostrarSpinnerPostal ||
                          !usuarioState ||
                          usuarioState?.rol === "administrador"
                            ? ".2"
                            : "",
                      }}
                      {...register("codigoPostal", {
                        required: "El código postal es obligatorio",
                        pattern: {
                          value: /^[A-Z][0-9]{4,6}$/i,
                          message:
                            "El código postal debe tener un formato válido",
                        },
                      })}
                    />
                    {mostrarSpinnerPostal ? (
                      <div className="d-flex justify-content-center align-items-center ms-2 w-25">
                        <ClipLoader />
                      </div>
                    ) : (
                      <button
                        type={!usuarioState ? "button" : "submit"}
                        className="boton_calcular"
                        onClick={
                          !usuarioState?.carrito ||
                          usuarioState?.rol === "administrador"
                            ? manejoSesion
                            : () => null
                        }
                      >
                        Calcular
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="bg-success w-100 py-2 text-center text-light position-relative">
                    Tu envío es de ${costoEnvio}
                  </div>
                )}
                {!usuarioState ||
                  (usuarioState?.rol !== "administrador" && (
                    <div className="text-danger w-75">
                      {errors.codigoPostal?.message}
                    </div>
                  ))}
                <button
                  className="agregar_carrito w-100"
                  type="submit"
                  disabled={!formEnviado}
                  onClick={() => {
                    setFormEnviado(true);
                  }}
                  style={{
                    opacity: !formEnviado || mostrarSpinnerPostal ? ".2" : "1",
                    pointerEvents:
                      !formEnviado || mostrarSpinnerPostal ? "none" : "auto",
                  }}
                >
                  Agregar al carrito
                </button>
              </form>
            </div>
          </>
        ) : error ? (
          <Error404 />
        ) : (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "80vh" }}
          >
            <ClipLoader size={45} />
          </div>
        )}
      </article>
    </section>
  );
};

export default DetalleProducto;
