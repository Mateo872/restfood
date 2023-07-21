import React from "react";
import { useState } from "react";
import CardNosotros from "./CardNosotros";

const Nosotros = () => {
  const [tarjeta, setTarjeta] = useState(false);
  const nosotros = [
    {
      nombre: "Mateo",
      edad: 21,
    },
    {
      nombre: "Mario",
      edad: 25,
    },
    ,
    {
      nombre: "Aixa",
      edad: 22,
    },
    {
      nombre: "Tadeo",
      edad: 23,
    },
    {
      nombre: "Juan",
      edad: 22,
    },
  ];
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
            {nosotros.map((nos) => (
              <div className="tarjetas_nosotros" key={nos.nombre}>
                <p className="mb-0">{nos.nombre}</p>
              </div>
            ))}
          </div>
          <h4 className={`position-absolute ${tarjeta && "d-none"}`}>ABRIR</h4>
          <div className={`tarjeta ${tarjeta && "tarjeta_abierta"}`}></div>
        </div>
        <div
          className={`${
            tarjeta && "nosotros_carac-activo"
          } nosotros_carac d-flex flex-column flex-md-row justify-content-center align-items-center mt-4`}
        >
          <div className="imagen_nosotros"></div>
          <CardNosotros nosotros={nosotros} />
        </div>
      </article>
    </section>
  );
};

export default Nosotros;
