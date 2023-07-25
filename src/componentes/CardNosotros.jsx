import { Link } from "react-router-dom";

const CardNosotros = ({ nosotros, tarjetaNombre }) => {
  const nombreFiltrado = nosotros.filter((nos) => nos.nombre === tarjetaNombre);

  return (
    <a
      href={nombreFiltrado[0]?.github}
      target="_blank"
      className="d-flex flex-md-column text-center align-items-center gap-2 text-decoration-none"
    >
      <p className="nombre_nosotros">{nombreFiltrado[0]?.nombre}</p>
      <h3 className="edad_nosotros" style={{ color: "#1e1e1e" }}>
        {nombreFiltrado[0]?.edad}
      </h3>
    </a>
  );
};

export default CardNosotros;
