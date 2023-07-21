import { Pagination } from "@mui/material";

const Paginacion = ({ totalPaginas, paginaActual, setPaginaActual }) => {
  const manejoPagina = (evento, valor) => {
    setPaginaActual(valor);
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
