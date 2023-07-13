import React from "react";
import { Container } from "react-bootstrap";
import TarjetaProducto from "../TarjetaProducto";
import { BsCartPlusFill } from "react-icons/bs";

const Menu = () => {
    return (
        <section className="menu-contenedor">
            <Container className="menu-contenedor-body">
                <h1 className="text-white text-center">Menu</h1>
                <div className="d-flex justify-content-between">
                    <p>Busca tus productos</p>
                    <div>
                        <input type="text" className="" />
                    </div>
                </div>
                <TarjetaProducto />
            </Container>
        </section>
    );
};

export default Menu;
