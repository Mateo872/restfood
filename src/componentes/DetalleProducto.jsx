import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { BsTruck } from "react-icons/bs";
import {
  agregarCarrito,
  agregarFavoritos,
  obtenerPlato,
  obtenerUsuario,
} from "./ayudas/consultas";
import { useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import Error404 from "./Error404";
import Swal from "sweetalert2";

const DetalleProducto = () => {
  const { id } = useParams();
  const [plato, setPlato] = useState(null);
  const [postal, setPostal] = useState(false);
  const [mostrarSpinner, setMostrarSpinner] = useState(false);
  const [mostrarSpinnerPostal, setMostrarSpinnerPostal] = useState(false);
  const [tamanio, setTamanio] = useState("Chico");
  const [error, setError] = useState(false);
  const [formEnviado, setFormEnviado] = useState(null);
  const [costoEnvio, setCostoEnvio] = useState(0);
  const [usuarioID, setUsuarioID] = useState(null);
  const usuario = JSON.parse(sessionStorage.getItem("usuario")) || null;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    obtenerPlato(id)
      .then((respuesta) => {
        if (Object.keys(respuesta).length !== 0) {
          setMostrarSpinner(true);
          setTimeout(() => {
            setPlato(respuesta);
            setMostrarSpinner(false);
          }, 500);
        } else {
          setMostrarSpinner(false);
          setTimeout(() => {
            setError(true);
          }, 500);
        }
      })
      .catch((err) => {
        console.log(err);
        setMostrarSpinner(false);
        setTimeout(() => {
          setError(true);
        }, 500);
      });
  }, []);

  useEffect(() => {
    obtenerUsuario(usuario.id).then((res) => {
      setUsuarioID(res);
    });
  }, [usuarioID]);

  const manejoFav = async () => {
    const existe = usuario.favoritos.find((fav) => fav === plato.id);
    try {
      if (!existe) {
        await agregarFavoritos(usuario.id, [plato.id]);
      } else {
        const nuevosFavoritos = usuario.favoritos.filter(
          (fav) => fav !== plato.id
        );
        await agregarFavoritos(usuario.id, nuevosFavoritos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const manejoTamanio = (e) => {
    const nuevoTamanio = e.target.textContent;
    setTamanio(nuevoTamanio);
  };

  const obtenerPrecioConTamanio = () => {
    let precioInicial = plato.precio;

    if (tamanio === "Mediano") {
      return Math.ceil(precioInicial * 1.2);
    } else if (tamanio === "Grande") {
      return Math.ceil(precioInicial * 1.4);
    }

    return precioInicial;
  };

  const manejoEnvio = async (data) => {
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
        data = {
          id: plato.id,
          nombre: plato.nombre,
          precio: obtenerPrecioConTamanio(),
          cantidad: parseInt(data.cantidad),
          costoEnvio,
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
            setTamanio("Chico");
            setPostal(false);
            setCostoEnvio(0);
            setFormEnviado(false);
            agregarCarrito(usuario.id, plato.id, data);
            reset();
          } else {
            setTamanio("Chico");
            setPostal(false);
            setCostoEnvio(0);
            setFormEnviado(false);
            reset();
          }
        });
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
        ) : plato && Object.keys(plato).length !== 0 ? (
          <>
            <div className="d-flex gap-1 paginacion">
              <Link to={"/"}>INICIO /</Link>
              <span className="paginacion_detalle">
                {plato.categoria?.toUpperCase()} /
              </span>
              <span className="paginacion_detalle-color">
                {plato.nombre?.toUpperCase()}
              </span>
            </div>
            <p className="stock mb-0">
              Stock - <span>{plato.stock}</span>
            </p>
            <div className="contenedor_imagen-carac d-flex flex-column flex-md-row gap-4 position-relative">
              <div
                className="contenedor_imagen-detalle"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${plato.imagen})`,
                }}
              ></div>
              <div onClick={manejoFav}>
                {usuarioID.favoritos.find((fav) => fav.id === plato.id) ? (
                  <GoBookmarkFill className="bookmark position-absolute" />
                ) : (
                  <GoBookmark className="bookmark position-absolute" />
                )}
              </div>
              <form
                onSubmit={handleSubmit(manejoEnvio)}
                className="contenedor_caracteristicas-detalle d-flex flex-column justify-content-lg-between"
              >
                <h2 className="titulo_producto-detalle mt-0">{plato.nombre}</h2>
                <h2 className="titulo_precio-detalle mt-0">
                  ${obtenerPrecioConTamanio()}
                </h2>
                <p className="descripcion_detalle mb-0" title="">
                  {plato.descripcion}
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
                  disabled={mostrarSpinnerPostal}
                  style={{
                    opacity: mostrarSpinnerPostal && ".2",
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
                <div className="text-danger">{errors.cantidad?.message}</div>
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
                      placeholder="Tu código postal"
                      disabled={mostrarSpinnerPostal && true}
                      style={{
                        opacity: mostrarSpinnerPostal && ".2",
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
                      <button className="boton_calcular">Calcular</button>
                    )}
                  </div>
                ) : (
                  <div className="bg-success w-100 py-2 text-center text-light position-relative">
                    Tu envío es de ${costoEnvio}
                  </div>
                )}
                <div className="text-danger w-75">
                  {errors.codigoPostal?.message}
                </div>
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
