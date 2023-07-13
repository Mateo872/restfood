import React from "react";
import { Card } from "react-bootstrap";
import hamburguesa from "../assets/img-hamb-card.png";
const TarjetaProducto = () => {
    return (
        <Card className="card-body" style={{ width: "18rem" }}>
            <Card.Img variant="top" src={hamburguesa} className="img-tarjeta-producto" />
            <Card.Body className="body-tarjeta">
                <Card.Title className="fs-3">Hamburguesas</Card.Title>
                <Card.Text className="fs-5">
                    Stock: <span className="fw-light text-secondary"> 20</span>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default TarjetaProducto;
