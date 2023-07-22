import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { BsTruck } from "react-icons/bs";
import { obtenerPlato } from "./ayudas/consultas";
import { useNavigate } from "react-router-dom";

const DetalleProducto = () => {
  const { id } = useParams();
  const [plato, setPlato] = useState([]);
  const [favorito, setFavorito] = useState(false);
  const [tamanio, setTamanio] = useState("Chico");
  const navegacion = useNavigate();

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
              <div className="contenedor_caracteristicas-detalle d-flex flex-column justify-content-lg-between">
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
                />
                <hr />
                <div className="d-flex align-items-center gap-1 mb-2">
                  <BsTruck className="svg_postal" size={25} />
                  <h4 className="mb-0">Medios de envío</h4>
                </div>
                <div className="d-flex gap-2 w-100">
                  <input
                    type="number"
                    className="input_postal"
                    placeholder="Tu código postal"
                  />
                  <button className="boton_calcular">Calcular</button>
                </div>
                <button className="agregar_carrito w-100">
                  Agregar al carrito
                </button>
              </div>
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
