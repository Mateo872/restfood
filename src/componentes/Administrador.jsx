import React from "react";
import { Button } from "react-bootstrap";
import { BsFillPlusSquareFill, BsCheckSquareFill } from "react-icons/bs";
import ItemProducto from "./ItemProducto";
import Table from "react-bootstrap/Table";
import ItemUsuario from "./ItemUsuario";
import ItemPedidos from "./ItemPedidos";

const Administrador = () => {
    return (
        <div className="fondo">
            <section className="text-white text-center p-5 mt-5">
                <h1>Hola, Rolling</h1>
                <p>Como administrador, tus responsabilidades pueden incluir:</p>
                <ol>
                    <li className="text-start">Administrar los usuarios.</li>
                    <li className="text-start">Supervisar los productos.</li>
                    <li className="text-start">Controlar los pedidos.</li>
                </ol>
            </section>
            <section className="text-white bg-dark contenedorAdministracion">
                <article>
                    <div className="d-flex justify-content-between mb-5">
                        <h2>Productos</h2>
                        <div>
                            <Button className="btnAgregar me-1">
                                Agregar
                            </Button>
                            <Button variant="outline-success" className="btnSeleccionar">
                                Seleccionar
                            </Button>
                            <BsFillPlusSquareFill className="iconoAgregar me-2"></BsFillPlusSquareFill>
                            <BsCheckSquareFill className="iconoSeleccionar"></BsCheckSquareFill>
                        </div>
                    </div>
                    <div className="row row-cols-sm-1 row-cols-md-3 row-cols-lg-3 contenedorProductos">
                        <ItemProducto></ItemProducto>
                        <ItemProducto></ItemProducto>
                        <ItemProducto></ItemProducto>
                        <ItemProducto></ItemProducto>
                        <ItemProducto></ItemProducto>
                        <ItemProducto></ItemProducto>
                        <ItemProducto></ItemProducto>
                        <ItemProducto></ItemProducto>
                        <ItemProducto></ItemProducto>
                        <ItemProducto></ItemProducto>
                        <ItemProducto></ItemProducto>
                        <ItemProducto></ItemProducto>
                    </div>
                </article>
                <article className="my-5">
                    <div className="d-flex justify-content-between mb-3">
                        <h2>Usuarios</h2>
                        <div>
                            <Button variant="success" className="btnAgregar me-1">
                                Agregar
                            </Button>
                            <BsFillPlusSquareFill className="iconoAgregar me-2"></BsFillPlusSquareFill>
                        </div>
                    </div>
                    <Table responsive className="tabla">
                        <thead>
                            <tr>
                                <th>Img</th>
                                <th>Email</th>
                                <th>Nombre</th>
                                <th>Rol</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ItemUsuario></ItemUsuario>
                            <ItemUsuario></ItemUsuario>
                        </tbody>
                    </Table>
                </article>
                <article className="mb-5">
                    <h2 className="mb-3">Pedidos</h2>
                    <Table responsive className="tabla">
                        <thead>
                            <tr>
                                <th>Email de usuario</th>
                                <th>Nombre</th>
                                <th>Estado</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ItemPedidos></ItemPedidos>
                            <ItemPedidos></ItemPedidos>
                        </tbody>
                    </Table>
                </article>
            </section>
        </div>
    );
};

export default Administrador;
