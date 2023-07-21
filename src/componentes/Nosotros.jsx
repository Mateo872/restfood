import React from "react";
import { useState } from "react";
import CardNosotros from "./CardNosotros";
import { useEffect } from "react";

const Nosotros = () => {
  const [tarjeta, setTarjeta] = useState(false);
  const [tarjetaNosotros, setTarjetaNosotros] = useState(false);
  const [tarjetaNombre, setTarjetaNombre] = useState("");

  const nosotros = [
    {
      nombre: "Mateo",
      edad: 21,
    },
    {
      nombre: "Mario",
      edad: 25,
    },
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

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (!e.target.className.includes("tarjeta")) {
        setTarjeta(false);
        setTarjetaNosotros(false);
      }
    });
  }, []);

  return (
    <section>
      <article
        className="contenedor_nosotros"
        style={{ marginTop: tarjeta && "5rem", transition: ".3s" }}
      >
        <div
          className="contenedor_tarjeta d-flex justify-content-center"
          onClick={(e) => {
            setTarjeta(!tarjeta);
            if (
              e.target.className.includes("sobre") ||
              e.target.className.includes("titulo_abrir")
            ) {
              setTarjetaNosotros(false);
            }
          }}
        >
          <div
            className={`contenedor_tarjetas d-flex justify-content-center justify-content-md-between position-absolute ${
              tarjeta && "contenedor_tarjetas-activo"
            }`}
          >
            {nosotros.map((nos) => (
              <p
                className="tarjetas_nosotros"
                key={nos.nombre}
                onClick={() => {
                  setTarjetaNosotros(true);
                  setTarjetaNombre(nos.nombre);
                }}
              >
                {nos.nombre}
              </p>
            ))}
          </div>
          <h4
            className={`titulo_abrir position-absolute ${tarjeta && "d-none"}`}
          >
            ABRIR
          </h4>
          <div
            className={`sobre tarjeta ${tarjeta && "tarjeta_abierta"}`}
          ></div>
        </div>
        <div
          className={`${
            tarjetaNosotros && "nosotros_carac-activo"
          } nosotros_carac d-flex flex-column flex-md-row justify-content-center align-items-center mt-4`}
        >
          <div
            className="imagen_nosotros"
            style={{ backgroundColor: "#ddd" }}
          ></div>
          <CardNosotros nosotros={nosotros} tarjetaNombre={tarjetaNombre} />
        </div>
      </article>
    </section>
  );
};

export default Nosotros;
