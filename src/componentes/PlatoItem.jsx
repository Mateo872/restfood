import { Link } from "react-router-dom";
import { BsFillHeartFill } from "react-icons/bs";
import { useSelector } from "react-redux";

const PlatoItem = ({ platosFiltrados }) => {
  const usuarioState = useSelector((state) => state.usuarios.usuario);

  return (
    <>
      {platosFiltrados.map((plato) => (
        <Link
          to={`producto/detalle/${plato._id}`}
          className="buscador d-flex justify-content-between align-items-center"
          key={plato._id}
        >
          <div className="buscador d-flex align-items-center gap-2 position-relative">
            <div
              className={`contenedor_favoritos-buscador ${
                usuarioState?.nombre.length > 0 &&
                usuarioState?.favoritos.find((fav) => fav === plato._id)
                  ? "d-flex"
                  : "d-none"
              } justify-content-center align-items-center position-absolute`}
            >
              <BsFillHeartFill className="svg_favorito" />
            </div>
            <div className="buscador plato_imagen">
              <img
                className="buscador w-100 h-100"
                src={plato.imagen}
                alt={plato.nombre}
              />
            </div>
            <h6 className="buscador mb-0" title={plato.nombre}>
              {plato.nombre}
            </h6>
          </div>
          <h5 className="buscador mb-0">${plato.precio}</h5>
        </Link>
      ))}
    </>
  );
};

export default PlatoItem;
