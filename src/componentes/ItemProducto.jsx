import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import hamburguesa from "../assets/hamburguesaDoble.png";

const ItemProducto = () => {
  return (
    <Card className="cardPproducto text-center">
      <Card.Img variant="top" className="cardImg" src={hamburguesa} />
        <Card.Title>Hamburguesa doble</Card.Title>
        <Button variant="outline-success" className="m-1">Editar</Button>
        <Button variant="success" className="m-1">Eliminar</Button>
    </Card>
  );
};

export default ItemProducto;
