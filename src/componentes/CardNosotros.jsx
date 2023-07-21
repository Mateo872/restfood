const CardNosotros = ({ nosotros, tarjetaNombre }) => {
  const nombreFiltrado = nosotros.filter((nos) => nos.nombre === tarjetaNombre);

  return (
    <div className="d-flex flex-md-column text-center align-items-center gap-2">
      <a
        href={`${nombreFiltrado[0]?.github}`}
        target="_blank"
        className="nombre_nosotros"
      >
        {nombreFiltrado[0]?.nombre}
      </a>
      <h3 className="edad_nosotros">{nombreFiltrado[0]?.edad}</h3>
    </div>
  );
};

export default CardNosotros;
