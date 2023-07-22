import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GoBookmark } from "react-icons/go";
import { BsTruck } from "react-icons/bs";
import { obtenerPlato } from "./ayudas/consultas";
import hambur from "../complementos/imagenes/hambur.png";

const DetalleProducto = () => {
  const { id } = useParams();
  const [plato, setPlato] = useState([]);

  useEffect(() => {
    obtenerPlato(id).then((respuesta) => {
      setPlato(respuesta);
    });
  }, []);
  return (
    <section>
      <article className="contenedor_detalle">
        <div className="d-flex gap-1 paginacion">
          <Link to={"/"}>INICIO /</Link>
          <span className="paginacion_detalle-color">HAMBURGUESA DOBLE</span>
        </div>
        <p className="stock mb-0">
          Stock - <span>20</span>
        </p>
        <div className="contenedor_imagen-carac d-flex flex-column flex-md-row gap-4">
          <div className="contenedor_imagen-detalle">
            <img className="w-100 h-100" src={hambur} alt="" />
          </div>
          <div className="contenedor_caracteristicas-detalle d-flex flex-column">
            <h2 className="titulo_producto-detalle">HAMBURGUESA DOBLE</h2>
            <h2 className="titulo_precio-detalle mt-0">$1000</h2>
            <p className="descripcion_detalle mb-0" title="">
              Una deliciosa creación culinaria compuesta por dos jugosas y
              sabrosas hamburguesas de carne, apiladas una encima de la otra, y
              separadas por capas de queso fundido. Entre los panes suaves y
              ligeramente tostados se encuentran también una variedad de
              aderezos y condimentos, como lechuga crujiente, tomate fresco,
              cebolla, pepinillos y una irresistible salsa.
            </p>
            <h4 className="titulo_tamaño">Tamaño</h4>
            <div className="d-flex flex-column flex-md-row gap-2 align-items-center">
              <p className="contenedor_tamanio contenedor_tamanio-activo">
                Chico
              </p>
              <p className="contenedor_tamanio">Mediano</p>
              <p className="contenedor_tamanio">Grande</p>
            </div>
            <hr />
            <h4>Cantidad</h4>
            <input type="number" className="input_cantidad" placeholder="0" />
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
      </article>
    </section>
  );
};

export default DetalleProducto;
