import { useEffect, useState } from "react";
import PlatoItem from "./PlatoItem";
import { obtenerPlatos } from "./ayudas/consultas";

const ContenedorPlato = () => {
  const [platos, setPlatos] = useState([]);
  // const []

  useEffect(() => {
    obtenerPlatos().then((res) => {
      setPlatos(res[0].categorias);
    });
  }, []);

  return (
    <div className="contenedor_slider  position-absolute">
      <div className="contenedor_buscador d-flex flex-column justify-content-between gap-2">
        <PlatoItem />
        <PlatoItem />
        <PlatoItem />
        <PlatoItem />
        <PlatoItem />
        <PlatoItem />
        <PlatoItem />
      </div>
    </div>
  );
};

export default ContenedorPlato;
