import { BsSearch } from "react-icons/bs";
import ContenedorPlato from "./ContenedorPlato";
import { useState } from "react";

const BuscadorPlatos = () => {
  const [input, setInput] = useState([]);
  return (
    <section className="contenedor_platos">
      <article className="d-flex flex-column align-items-center justify-content-center">
        <h1 className="text-center">
          Nuestros platos favoritos en un solo lugar
        </h1>
        <h3 className="text-center">
          Descubre una experiencia culinaria única con nuestra herramienta de
          búsqueda
        </h3>
        <div
          className={`contenedor_input d-flex align-items-center ${
            input.length !== 0 && "contenedor_radio"
          }`}
        >
          <input
            type="text"
            placeholder="Sushi, lomito, tacos"
            onChange={(e) => setInput(e.target.value)}
            className={`${input.length !== 0 && "w-100"}`}
          />
          <div
            className={`icono_buscador ${
              input.length > 0 ? "d-none" : "d-flex"
            } align-items-center justify-content-center`}
          >
            <BsSearch />
          </div>
          {input.length !== 0 && <ContenedorPlato />}
        </div>
        <div className="categorias d-flex">
          <p className="mb-0">Hamburguesa</p>
          <p className="mb-0">Pollo</p>
          <p className="mb-0">Hamburguesa</p>
          <p className="mb-0">Pollo</p>
        </div>
      </article>
    </section>
  );
};

export default BuscadorPlatos;
