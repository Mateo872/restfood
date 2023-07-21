import React from "react";
import Card from "react-bootstrap/Card";
import hamburguesa from "../complementos/imagenes/hamburguesaDoble.png";
import { Link } from "react-router-dom";

const ItemProducto = () => {
  return (
    <Card className="cardProducto text-center">
      <Card.Img variant="top" className="cardImg" src={hamburguesa} />
      <Card.Title className="titulo_producto">Hamburguesa doble</Card.Title>
      <Link
        to={`/producto/editar/2`}
        className="boton_producto boton_editar m-1"
      >
        Editar
      </Link>
      <button className="boton_producto boton_eliminar m-1">Eliminar</button>
    </Card>
  );
};

export default ItemProducto;
