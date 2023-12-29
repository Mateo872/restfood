import { Pagination } from "@mui/material";
import { ChangeEvent } from "react";

interface Props {
  totalPaginas: number;
  paginaActual: number;
  setPaginaActual: (arg: number) => void;
}

const Paginacion = ({ totalPaginas, paginaActual, setPaginaActual }: Props) => {
  const manejoPagina = (_: ChangeEvent<unknown>, valor: number) => {
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
