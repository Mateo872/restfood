import { Link } from "react-router-dom";

const PlatoItem = ({ platosFiltrados }) => {
  return (
    <>
      {platosFiltrados.map((plato) => (
        <Link
          to={`producto/detalle/${plato.id}`}
          className="d-flex justify-content-between align-items-center"
          key={plato.nombre}
        >
          <div className="d-flex align-items-center gap-2">
            <div className="plato_imagen">
              <img
                className="w-100 h-100"
                src={plato.imagen}
                alt={plato.nombre}
              />
            </div>
            <h6 className="mb-0" title={plato.nombre}>
              {plato.nombre}
            </h6>
          </div>
          <h5 className="mb-0">${plato.precio}</h5>
        </Link>
      ))}
    </>
  );
};

export default PlatoItem;
