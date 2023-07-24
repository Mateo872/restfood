import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import TarjetaProducto from "./TarjetaProducto";
import { useForm } from "react-hook-form";
import { obtenerPlatos } from "./ayudas/consultas";
import Paginacion from "./Paginacion";
import { BsSliders } from "react-icons/bs";
import ContenedorFiltros from "./ContenedorFiltros";

const Menu = () => {
  const [busqueda, setBusqueda] = useState("");
  const [productos, setProductos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [mostrarFiltro, setMostrarFiltro] = useState(null);
  const productosPorPagina = 6;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    obtenerPlatos().then((res) => {
      setProductos(res);
    });
  }, []);

  const manejoBuscador = (e) => {
    setBusqueda(e.target.value);
    setPaginaActual(1);
  };

  const platosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const totalPaginas = Math.ceil(platosFiltrados.length / productosPorPagina);

  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosPaginaActual = platosFiltrados.slice(
    indicePrimerProducto,
    indiceUltimoProducto
  );

  return (
    <>
      <div className="menuConteiner"></div>
      <section className="menu-contenedor" id="productos">
        <Container className="menu-contenedor-body">
          <h2 className="text-white text-center menu-titulo mb-5">Menu</h2>
          <div className="d-flex flex-column flex-md-row flex-lg-row justify-content-between align-items-center">
            <p className="titulo text-center text-lg-start mb-2 mb-md-0">
              Todos los productos
            </p>
            <div className="contenedor_buscador-filtro d-flex justify-content-between justify-content-md-end align-items-center gap-2">
              <input
                type="text"
                placeholder="Busca tus platos"
                onChange={manejoBuscador}
                value={busqueda}
                className="input_menu w-100"
              />
              <BsSliders onClick={() => setMostrarFiltro(!mostrarFiltro)} />
            </div>
          </div>
          <hr className="text-white " />
          <section
            className={`container-menu-card ${
              platosFiltrados.length === 0 && "mt-0"
            }`}
          >
            <div
              className="row gap-5 "
              style={{
                justifyContent:
                  platosFiltrados.length < 3 || productosPaginaActual.length < 3
                    ? "center"
                    : "space-between",
              }}
            >
              {platosFiltrados.length > 0 ? (
                <TarjetaProducto
                  platosFiltrados={platosFiltrados}
                  productosPaginaActual={productosPaginaActual}
                />
              ) : (
                <p className="text-center py-4">No hay platos disponibles</p>
              )}
            </div>
            <div
              className={`${
                platosFiltrados.length > 0 ? "d-flex" : "d-none"
              } justify-content-center align-items-center pb-5`}
            >
              <Paginacion
                totalPaginas={totalPaginas}
                paginaActual={paginaActual}
                setPaginaActual={setPaginaActual}
              />
            </div>
            <ContenedorFiltros />
          </section>
        </Container>
      </section>
    </>
  );
};

export default Menu;
