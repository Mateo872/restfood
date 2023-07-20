import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import TarjetaProducto from "../TarjetaProducto";
import { useForm } from "react-hook-form";
import { obtenerPlatos } from "../ayudas/consultas";

const Menu = () => {
  const [busqueda, setBusqueda] = useState("");
  const [productos, setProductos] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    obtenerPlatos().then((res) => {
      const todasCategorias = [
        ...res[0].categorias.entradas,
        ...res[0].categorias.bebidas,
        ...res[0].categorias.postres,
        ...res[0].categorias.bebidasAlcoholicas,
        ...res[0].categorias.comidasVeganas,
      ];

      setProductos(todasCategorias);
    });
  }, []);

  const manejoBuscador = (e) => {
    setBusqueda(e.target.value);
  };

  const platosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      <div className="menuConteiner"></div>
      <section className="menu-contenedor" id="productos">
        <Container className="menu-contenedor-body">
          <h2 className="text-white text-center menu-titulo mb-5">Menu</h2>
          <div className="d-flex flex-column flex-md-row flex-lg-row justify-content-between">
            <p className="fs-3 text-center text-lg-start mb-0 ">
              Busca tus productos
            </p>
            <input
              type="text"
              placeholder="Busca tus platos"
              onChange={manejoBuscador}
              value={busqueda}
              className="input_menu"
            />
          </div>
          <hr className="text-white " />
          <section className="container-menu-card">
            <div className="row justify-content-center justify-content-md-between gap-5 ">
              <TarjetaProducto platosFiltrados={platosFiltrados} />
            </div>
          </section>
        </Container>
      </section>
    </>
  );
};

export default Menu;
