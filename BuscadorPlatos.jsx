import { BsSearch } from "react-icons/bs";

const BuscadorPlatos = () => {
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
        <div className="contenedor_input d-flex align-items-center">
          <input type="text" placeholder="Sushi, lomito, tacos" />
          <div className="icono_buscador d-flex align-items-center justify-content-center">
            <BsSearch />
          </div>
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
