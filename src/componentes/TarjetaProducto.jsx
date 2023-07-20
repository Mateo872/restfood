import React from "react";
import { Card, Image } from "react-bootstrap";
import hamburguesa from "../complementos/imagenes/img-hamb-card.png";
import { BsPlusCircleFill } from "react-icons/bs";

const TarjetaProducto = ({ productos }) => {
    return (
        <>
            {productos.map((producto, index) => (
                <Card key={index} className="card-body my-3 mt-5 mb-5">
                    <Card.Img
                        variant="top"
                        src={producto.imagen}
                        className="img-tarjeta-producto"
                    />
                    <Card.Body className="body-tarjeta">
                        <Card.Title className="fs-3">{producto.nombre}</Card.Title>
                        <Card.Text className="fs-5 my-4">
                            Stock:{" "}
                            <span className="fw-light text-secondary">
                                {" "}
                                {producto.stock}
                            </span>
                        </Card.Text>
                        <div className="d-flex mt-5 justify-content-between">
                            <Card.Text className="fs-5 my-5">
                                {" "}
                                $ {producto.precio}
                            </Card.Text>
                            <a>
                                <BsPlusCircleFill fontSize={40} className="mt-5" />
                            </a>
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </>
    );
};

export default TarjetaProducto;
/*   */
