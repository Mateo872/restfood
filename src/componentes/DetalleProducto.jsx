import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { BsTruck } from "react-icons/bs";
import { obtenerPlato } from "./ayudas/consultas";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import { useRef } from "react";

const DetalleProducto = () => {
  const { id } = useParams();
  const [plato, setPlato] = useState([]);
  const [favorito, setFavorito] = useState(false);
  const [postal, setPostal] = useState(false);
  const [mostrarSpinner, setMostrarSpinner] = useState(false);
  const [tamanio, setTamanio] = useState("Chico");
  const codigoPostal = useRef(null);
  const navegacion = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    obtenerPlato(id)
      .then((respuesta) => {
        if (respuesta) {
          setPlato(respuesta);
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const manejoEnvio = (data) => {
    setMostrarSpinner(true);
    setTimeout(() => {
      setPostal(true);
      setMostrarSpinner(false);
    }, 1500);
  };

  const manejoTamanio = (e) => {
    const nuevoTamanio = e.target.textContent;
    setTamanio(nuevoTamanio);
  };

  const obtenerPrecioConTamanio = () => {
    let precioInicial = plato.precio;

    if (tamanio === "Mediano") {
      return precioInicial + 200;
    } else if (tamanio === "Grande") {
      return precioInicial + 400;
    }

    return precioInicial;
  };

  return (
    <section>
      <article className="contenedor_detalle">
        {plato && Object.keys(plato).length !== 0 ? (
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
              <div onClick={() => setFavorito(!favorito)}>
                {favorito ? (
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
                      {...register("codigoPostal", {
                        required: "El código postal es obligatorio",
                        pattern: {
                          value: /^[A-Z][0-9]{4,6}$/i,
                          message:
                            "El código postal debe tener un formato válido",
                        },
                      })}
                    />
                    {mostrarSpinner ? (
                      <div className="d-flex justify-content-center align-items-center ms-2 w-25">
                        <ClipLoader />
                      </div>
                    ) : (
                      <button className="boton_calcular">Calcular</button>
                    )}
                  </div>
                ) : (
                  <div className="bg-success w-100 py-2 text-center text-light position-relative">
                    Tu envío es de $300
                    <span
                      className="cerrar_postal position-absolute"
                      onClick={() => {
                        setPostal(false);
                      }}
                    >
                      X
                    </span>
                  </div>
                )}
                <div className="text-danger w-75">
                  {errors.codigoPostal?.message}
                </div>
                <button className="agregar_carrito w-100">
                  Agregar al carrito
                </button>
              </form>
            </div>
          </>
        ) : (
          navegacion("/producto-no-encontrado")
        )}
      </article>
    </section>
  );
};

export default DetalleProducto;
