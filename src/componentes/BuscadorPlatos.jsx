import { BsSearch } from "react-icons/bs";
import ContenedorPlato from "./ContenedorPlato";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const BuscadorPlatos = () => {
  const [input, setInput] = useState("");
  const [mostrarSlider, setMostrarSlider] = useState(false);
  const [mostrarSpinner, setMostrarSpinner] = useState(false);
  const productosState = useSelector((state) => state.productos.productos);

  useEffect(() => {
    document.addEventListener("click", manejoClick);
  }, []);

  const manejoClick = (e) => {
    if (!e.target.classList.contains("buscador")) {
      setMostrarSlider(false);
      setInput("");
    }
  };

  const manejoBuscador = (e) => {
    setInput(e.target.value);
    spinner();
    setMostrarSlider(true);
  };

  const spinner = () => {
    setMostrarSpinner(true);
    setTimeout(() => {
      setMostrarSpinner(false);
    }, 1000);
  };

  const platosFiltrados = productosState.filter((plato) =>
    plato.nombre.toLowerCase().includes(input.toLowerCase())
  );

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
          className={`contenedor_input d-flex align-items-center buscador ${
            input.length !== 0 && mostrarSlider && "contenedor_radio"
          }`}
        >
          <input
            type="text"
            placeholder="Sushi, lomito, tacos"
            onChange={manejoBuscador}
            value={input}
            className={`buscador ${
              input.length !== 0 && mostrarSlider && "w-100"
            }`}
          />
          <div
            className={`icono_buscador buscador ${
              input.length > 0 ? "d-none" : "d-flex"
            } align-items-center justify-content-center`}
          >
            <BsSearch />
          </div>
          {input.length !== 0 && mostrarSlider && (
            <ContenedorPlato
              platosFiltrados={platosFiltrados}
              mostrarSpinner={mostrarSpinner}
            />
          )}
        </div>
      </article>
    </section>
  );
};

export default BuscadorPlatos;
