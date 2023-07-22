import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const ItemProducto = ({
  platos,
  seleccion,
  setSeleccionados,
  seleccionados,
}) => {
  const manejoSeleccion = () => {
    const existe = seleccionados.find((selec) => selec === platos.nombre);

    if (!existe) {
      setSeleccionados([...seleccionados, platos.nombre]);
    } else {
      const existe = seleccionados.filter((selec) => selec !== platos.nombre);
      setSeleccionados(existe);
    }
  };

  return (
    <Card className="card_producto text-center">
      <Card.Img
        variant="top"
        className="cardImg"
        src={platos?.imagen}
        alt={platos.nombre}
      />
      <Card.Title className="titulo_producto">{platos.nombre}</Card.Title>
      <div className={`${seleccion && "d-none"}`}>
        <Link
          to={`/producto/editar/2`}
          className="boton_producto boton_editar m-1"
        >
          Editar
        </Link>
        <button className="boton_producto boton_eliminar m-1">Eliminar</button>
      </div>
      <div
        className={`${
          seleccion ? "d-block" : "d-none"
        } d-flex justify-content-center`}
      >
        <button
          className="boton_producto boton_agregar m-1 w-50"
          onClick={manejoSeleccion}
        >
          {seleccionados.length > 0 &&
          seleccionados.find((selec) => selec === platos.nombre)
            ? "Cancelar"
            : "Seleccionar"}
        </button>
      </div>
    </Card>
  );
};

export default ItemProducto;
