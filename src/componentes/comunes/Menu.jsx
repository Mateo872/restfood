import React from "react";
import { Container, Form } from "react-bootstrap";
import TarjetaProducto from "../TarjetaProducto";
import { BsHandIndexThumbFill } from "react-icons/bs";

const Menu = () => {
    return (
        <>
            <div className="menuConteiner"></div>
            <section className="menu-contenedor">
                <Container className="menu-contenedor-body">
                    <h2 className="text-white text-center menu-titulo mb-5">Menu</h2>
                    <div className="d-flex justify-content-between">
                        <p className="fs-3">Busca tus productos</p>
                        <Form className="d-flex">
                            <Form.Group className="">
                                <Form.Control type="text" placeholder="Buscar" />
                            </Form.Group>
                            <BsHandIndexThumbFill size={28} className="ms-3" />
                        </Form>
                    </div>
                    <hr className="text-white " />
                    <section className="container-menu-card">
                        <div className="row  justify-content-center gap-5 ">
                            <TarjetaProducto />
                            <TarjetaProducto />
                            <TarjetaProducto />
                            <TarjetaProducto />
                            <TarjetaProducto />
                            <TarjetaProducto />
                            <TarjetaProducto />
                            <TarjetaProducto />
                            <TarjetaProducto />
                            <TarjetaProducto />
                            <TarjetaProducto />
                        </div>
                    </section>
                </Container>
            </section>
        </>
    );
};

export default Menu;
