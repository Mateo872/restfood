import PlatoItem from "./PlatoItem";
import ClipLoader from "react-spinners/ClipLoader";

const ContenedorPlato = ({ platosFiltrados, mostrarSpinner }) => {
  return (
    <div
      className={`contenedor_slider position-absolute buscador ${
        platosFiltrados.length > 4 && "altura_buscador"
      }`}
      style={{
        height: platosFiltrados.length < 4 || mostrarSpinner ? "auto" : "8rem",
      }}
    >
      <div className="contenedor_buscador buscador d-flex flex-column justify-content-between gap-2">
        {platosFiltrados.length > 0 ? (
          !mostrarSpinner ? (
            <PlatoItem platosFiltrados={platosFiltrados} />
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <ClipLoader color="#1e1e1e" />
            </div>
          )
        ) : (
          <p className="mensaje_plato mb-0">No hay platos disponibles</p>
        )}
      </div>
    </div>
  );
};

export default ContenedorPlato;
