import React from "react";
import { Button } from "react-bootstrap";
import { BsFillPlusSquareFill, BsSquare } from "react-icons/bs";
import ItemProducto from "./ItemProducto";
import Table from "react-bootstrap/Table";
import ItemUsuario from "./ItemUsuario";
import ItemPedidos from "./ItemPedidos";
import { Link } from "react-router-dom";

const Administrador = () => {
  return (
    <div className="fondo">
      <section className="text-white text-center p-5 mt-5">
        <h1>Hola, Rolling</h1>
        <p>Como administrador, tus responsabilidades pueden incluir:</p>
        <ol>
          <li className="text-center">Administrar los usuarios.</li>
          <li className="text-center">Supervisar los productos.</li>
          <li className="text-center">Controlar los pedidos.</li>
        </ol>
      </section>
      <section className="text-white bg-dark contenedorAdministracion">
        <article>
          <div className="botones d-flex align-items-center justify-content-between mb-3 mb-lg-5">
            <h2 className="admin_titulo mb-0">Productos</h2>
            <div className="d-flex align-items-center gap-1 w-100 justify-content-end">
              <a href="#" className="boton_admin boton_seleccionar">
                Seleccionar
              </a>
              <Link
                to={"/producto/crear"}
                className="boton_admin boton_agregar"
              >
                Agregar
              </Link>
            </div>
          </div>
          <div className="row row-cols-sm-1 row-cols-md-3 contenedorProductos justify-content-between">
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
