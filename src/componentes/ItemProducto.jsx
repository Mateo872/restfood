import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import hamburguesa from "../complementos/imagenes/hamburguesaDoble.png";

const ItemProducto = () => {
  return (
    <Card className="cardPproducto text-center">
      <Card.Img variant="top" className="cardImg" src={hamburguesa} />
      <Card.Title>Hamburguesa doble</Card.Title>
      <Button variant="outline" className="btnEditarProducto m-1">
        Editar
      </Button>
      <Button className="btnEliminarProducto m-1">
        Eliminar
      </Button>
    </Card>
  );
};

export default ItemProducto;
