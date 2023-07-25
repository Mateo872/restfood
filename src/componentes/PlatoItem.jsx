import { Link } from "react-router-dom";
import { BsFillHeartFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { obtenerUsuario } from "./ayudas/consultas";

const PlatoItem = ({ platosFiltrados }) => {
  const usuario = JSON.parse(sessionStorage.getItem("usuario")) || null;
  const [usuarioID, setUsuarioID] = useState(null);

  useEffect(() => {
    obtenerUsuario(usuario.id).then((res) => {
      setUsuarioID(res);
    });
  }, []);

  return (
    <>
      {platosFiltrados.map((plato) => (
        <Link
          to={`producto/detalle/${plato.id}`}
          className="buscador d-flex justify-content-between align-items-center"
          key={plato.id}
        >
          <div className="buscador d-flex align-items-center gap-2 position-relative">
            <div
              className={`contenedor_favoritos-buscador ${
                usuarioID &&
                usuarioID.favoritos.find((fav) => fav.id === plato.id)
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
