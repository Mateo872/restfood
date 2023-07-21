const CardNosotros = ({ nosotros, tarjetaNombre }) => {
  const nombreFiltrado = nosotros.filter((nos) => nos.nombre === tarjetaNombre);

  return (
    <div className="d-flex flex-md-column text-center align-items-center gap-2">
      <h1 className="nombre_nosotros">{nombreFiltrado[0]?.nombre}</h1>
      <h3 className="edad_nosotros">{nombreFiltrado[0]?.edad}</h3>
    </div>
  );
};

export default CardNosotros;
