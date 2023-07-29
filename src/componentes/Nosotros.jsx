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
      github: "https://github.com/mateo872",
      edad: 21,
      imagen: "https://i.postimg.cc/3J5rC6zw/Mateo-Bellini.jpg",
    },
    {
      nombre: "Mario",
      github: "https://github.com/Mario-Chavez",
      edad: 35,
      imagen: "https://i.postimg.cc/65Fw1SDW/mario.jpg",
    },
    {
      nombre: "Aixa",
      github: "https://github.com/AixaFilsinger",
      edad: 22,
      imagen: "https://i.postimg.cc/Bnnq4BYR/aixa.jpg",
    },
    {
      nombre: "Tadeo",
      github: "https://github.com/teoMunoz99",
      edad: 24,
      imagen:
        "https://i.postimg.cc/wvT5kP00/45eb0dac-2704-42bb-8d43-d46b831f9bba.jpg",
    },
    {
      nombre: "Juan",
      github: "https://github.com/juantoranzos",
      edad: 20,
      imagen: "https://i.postimg.cc/tTtfsL7k/juan.jpg",
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
        <h1 className="text-center mb-5">Nuestro equipo</h1>
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
                style={{
                  cursor: "pointer",
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
          <a
            href={nosotros.find((nos) => nos.nombre === tarjetaNombre)?.github}
            target="_blank"
            className="imagen_nosotros"
            style={{
              backgroundImage: `url(${
                nosotros.find((nos) => nos.nombre === tarjetaNombre)?.imagen
              })`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              cursor: "pointer",
            }}
          ></a>
          <CardNosotros nosotros={nosotros} tarjetaNombre={tarjetaNombre} />
        </div>
      </article>
    </section>
  );
};

export default Nosotros;
