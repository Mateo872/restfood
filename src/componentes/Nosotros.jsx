import React from "react";
import { useState } from "react";

const Nosotros = () => {
  const [tarjeta, setTarjeta] = useState(false);
  return (
    <section>
      <article
        className="contenedor_nosotros"
        style={{ marginTop: tarjeta && "5rem", transition: ".3s" }}
      >
        <div
          className="contenedor_tarjeta d-flex justify-content-center"
          onClick={() => setTarjeta(!tarjeta)}
        >
          <div
            className={`contenedor_tarjetas d-flex justify-content-center justify-content-md-between position-absolute ${
              tarjeta && "contenedor_tarjetas-activo"
            }`}
          >
            <div className="tarjetas_nosotros">
              <p className="mb-0">Mateo</p>
            </div>
            <div className="tarjetas_nosotros">
              <p className="mb-0">Mario</p>
            </div>
            <div className="tarjetas_nosotros">
              <p className="mb-0">Aixa</p>
            </div>
            <div className="tarjetas_nosotros">
              <p className="mb-0">Tadeo</p>
            </div>
            <div className="tarjetas_nosotros">
              <p className="mb-0">Juan</p>
            </div>
          </div>
          <h4 className={`position-absolute ${tarjeta && "d-none"}`}>ABRIR</h4>
          <div className={`tarjeta ${tarjeta && "tarjeta_abierta"}`}></div>
        </div>
      </article>
    </section>
  );
};

export default Nosotros;
