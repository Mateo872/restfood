import React from "react";
import Header from "../componentes/comunes/Header";
import Footer from "../componentes/comunes/Footer";
import "./Administrador.css";
import { Button, Container } from "react-bootstrap";
import { BsFillPlusSquareFill, BsCheckSquareFill } from "react-icons/bs";
import ItemProducto from "../componentes/ItemProducto";

const Administrador = () => {
  return (
    <div className="fondo">
      <Header></Header>
      {/*Texto de Bienvenida*/}
      <section className="text-white text-center p-5 mt-5">
        <h1>Hola, Rolling</h1>
        <p>Como administrador, tus responsabilidades pueden incluir:</p>
        <ol>
          <li className="text-start">Administrar los usuarios.</li>
          <li className="text-start">Supervisar los productos.</li>
          <li className="text-start">Controlar los pedidos.</li>
        </ol>
      </section>
      {/*Contenedor de administracion*/}
      <section className="text-white bg-dark contenedorAdministracion">
        {/*Título y botones de agregar y seleccionar*/}
        <article className="d-flex justify-content-between mb-5">
          <h2>Productos</h2>
          <div>
            <Button variant="success" className="btnAgregar me-1">
              Agregar
            </Button>
            <Button variant="warning" className="btnSeleccionar">
              Seleccionar
            </Button>
            <BsFillPlusSquareFill className="iconoAgregar me-2"></BsFillPlusSquareFill>
            <BsCheckSquareFill className="iconoSeleccionar"></BsCheckSquareFill>
          </div>
        </article>
        {/*Productos*/}
        <article className="row row-cols-sm-1 row-cols-md-3 row-cols-lg-3 contenedorProductos">
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
        </article>
        {/*Usuarios*/}
        <article></article>
        {/*Pedidos*/}
        <article>
            <h2>Usuarios</h2>
        </article>
      </section>
      <Footer></Footer>
    </div>
  );
};

export default Administrador;
