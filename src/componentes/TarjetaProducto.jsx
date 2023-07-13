import React from "react";
import { Card } from "react-bootstrap";
import hamburguesa from "../assets/img-hamb-card.png";
import { BsPlusCircleFill } from "react-icons/bs";
const TarjetaProducto = () => {
    return (
        <Card className="card-body" style={{ width: "18rem" }}>
            <Card.Img variant="top" src={hamburguesa} className="img-tarjeta-producto" />
            <Card.Body className="body-tarjeta">
                <Card.Title className="fs-3">Hamburguesas</Card.Title>
                <Card.Text className="fs-5 my-4">
                    Stock: <span className="fw-light text-secondary"> 20</span>
                </Card.Text>
                <div className="d-flex mt-5 justify-content-between">
                    <Card.Text className="fs-5 my-5"> $ 1500</Card.Text>
                    <a>
                        <BsPlusCircleFill fontSize={40} className="mt-5" />
                    </a>
                </div>
            </Card.Body>
        </Card>
    );
};

export default TarjetaProducto;
