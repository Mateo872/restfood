import { Pagination } from "@mui/material";

const Paginacion = ({ totalPaginas, paginaActual, setPaginaActual }) => {
  const handlePageChange = (event, value) => {
    setPaginaActual(value);
  };

  return (
    <Pagination
      count={totalPaginas}
      page={paginaActual}
      onChange={handlePageChange}
      size="small"
    />
  );
};

export default Paginacion;
