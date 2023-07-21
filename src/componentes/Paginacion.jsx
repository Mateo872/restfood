import { Pagination } from "@mui/material";

const Paginacion = ({ totalPaginas, paginaActual, setPaginaActual }) => {
  const manejoPagina = (evento, value) => {
    setPaginaActual(value);
  };

  return (
    <Pagination
      count={totalPaginas}
      page={paginaActual}
      onChange={manejoPagina}
      size="small"
    />
  );
};

export default Paginacion;
