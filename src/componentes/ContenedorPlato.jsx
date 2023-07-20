import PlatoItem from "./PlatoItem";

const ContenedorPlato = ({ platosFiltrados }) => {
  return (
    <div
      className={`contenedor_slider position-absolute buscador ${
        platosFiltrados.length > 4 && "altura_buscador"
      }`}
      style={{ height: platosFiltrados.length < 4 && "auto" }}
    >
      <div className="contenedor_buscador buscador d-flex flex-column justify-content-between gap-2">
        {platosFiltrados.length > 0 ? (
          <PlatoItem platosFiltrados={platosFiltrados} />
        ) : (
          <p className="mensaje_plato mb-0">No hay platos disponibles</p>
        )}
      </div>
    </div>
  );
};

export default ContenedorPlato;
