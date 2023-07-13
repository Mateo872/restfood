import React from "react";
import { Card } from "react-bootstrap";
import hamburguesa from "../assets/img-hamb-card.png";
const TarjetaProducto = () => {
    return (
        <Card className="card-body" style={{ width: "18rem" }}>
            <Card.Img variant="top" src={hamburguesa} className="img-tarjeta-producto" />
            <Card.Body className="">
                <Card.Title>Título de la tarjeta</Card.Title>
                <Card.Text>
                    Contenido de la tarjeta. Puedes agregar aquí cualquier texto o
                    elementos HTML.
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default TarjetaProducto;
