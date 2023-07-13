import React from "react";
import { Container, Form } from "react-bootstrap";
import TarjetaProducto from "../TarjetaProducto";
import { BsHandIndexThumbFill } from "react-icons/bs";

const Menu = () => {
    return (
        <section className="menu-contenedor">
            <Container className="menu-contenedor-body">
                <h1 className="text-white text-center">Menu</h1>
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
                <section className="row justify-content-between  container-menu-card">
                    <TarjetaProducto />
                    <TarjetaProducto />
                    <TarjetaProducto />
                    <TarjetaProducto />
                    <TarjetaProducto />
                    <TarjetaProducto />
                </section>
            </Container>
        </section>
    );
};

export default Menu;
