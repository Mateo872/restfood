import { ChangeEvent, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import TarjetaProducto from "./TarjetaProducto";
import Paginacion from "./Paginacion";
import { BsSliders } from "react-icons/bs";
import ContenedorFiltros from "./ContenedorFiltros";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector } from "react-redux";
import { Producto, ProductosState, UsuariosState } from "../types/types";

export interface PropsFiltros {
  categorias: (string | number)[];
  precio: (string | number)[];
  ordenar: string[];
  stock: (number | string)[];
  favoritos: string[];
  descuento: (string | number)[];
}

const Menu = () => {
  const [busqueda, setBusqueda] = useState("");
  const [productos, setProductos] = useState<Producto[]>([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [mostrarFiltro, setMostrarFiltro] = useState<boolean | null>(null);
  const [precioMinimo, setPrecioMinimo] = useState(0);
  const [precioMaximo, setPrecioMaximo] = useState(0);
  const [titulo, setTitulo] = useState("Todos los productos");
  const [textoVacio, setTextoVacio] = useState("No hay productos disponibles");
  const [spinner, setSpinner] = useState(false);
  const [filtros, setFiltros] = useState<PropsFiltros>({
    categorias: [],
    precio: [],
    ordenar: [],
    stock: [],
    favoritos: [],
    descuento: [],
  });
  const productosPorPagina = window.innerWidth >= 1400 ? 8 : 6;
  const productosState = useSelector(
    (state: ProductosState) => state.productos.productos
  );
  const usuariosState = useSelector(
    (state: UsuariosState) => state.usuarios.usuario
  );

  useEffect(() => {
    setProductos(productosState);
    const preciosProductosFiltrados = productosState.map(
      (producto) => producto.precio
    );
    const minPrecio = Math.min(...preciosProductosFiltrados);
    const maxPrecio = Math.max(...preciosProductosFiltrados);

    setPrecioMinimo(minPrecio);
    setPrecioMaximo(maxPrecio);
  }, [productosState]);

  const manejarScroll = () => {
    if (window.scrollY <= 500) {
      setMostrarFiltro(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", manejarScroll);
  }, []);

  const manejoBuscador = (e: ChangeEvent<HTMLInputElement>) => {
    setBusqueda(e.target.value);
    setSpinner(true);
    setTimeout(() => {
      setSpinner(false);
    }, 400);
    setPaginaActual(1);
  };

  const actualizarTitulo = (nuevoTitulo: string) => {
    setTitulo(nuevoTitulo);
  };

  const productoSinStock = productos.filter(
    (producto) => producto.stock === null || producto.stock === 0
  );

  const filtrarProductos = () => {
    let productosFiltrados = [...productos];

    if (busqueda.trim() !== "") {
      productosFiltrados = productosFiltrados.filter((producto) =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    if (filtros.categorias.length > 0) {
      productosFiltrados = productosFiltrados.filter((producto) =>
        filtros.categorias.includes(producto.categoria)
      );
    }

    if (filtros.precio.length > 0) {
      if (filtros.precio.includes("gratis")) {
        productosFiltrados = productosFiltrados.filter(
          (producto) => producto.precio === 0
        );
      } else if (filtros.precio.includes("bajo")) {
        productosFiltrados = productosFiltrados.filter(
          (producto) =>
            producto.precio > 0 && producto.precio < precioMinimo + 200
        );
      } else if (filtros.precio.includes("medio")) {
        productosFiltrados = productosFiltrados.filter(
          (producto) =>
            producto.precio > precioMinimo + 200 &&
            producto.precio < precioMaximo - precioMaximo / 2
        );
      } else if (filtros.precio.includes("caro")) {
        productosFiltrados = productosFiltrados.filter(
          (producto) =>
            producto.precio > precioMaximo - precioMaximo / 2 &&
            producto.precio < precioMaximo
        );
      }
    }

    if (filtros.ordenar.length > 0) {
      if (filtros.ordenar.includes("menor")) {
        productosFiltrados.sort((a, b) => a.precio - b.precio);
      } else if (filtros.ordenar.includes("mayor")) {
        productosFiltrados.sort((a, b) => b.precio - a.precio);
      }
    }

    if (filtros.stock.length > 0) {
      productosFiltrados = productosFiltrados.filter((producto) =>
        filtros.stock.includes("stock")
          ? +producto.stock > 0
          : +producto.stock === 0
      );
    }

    if (filtros.favoritos.includes("favoritos")) {
      productosFiltrados = productosFiltrados.filter(
        (producto) =>
          usuariosState.nombre.length > 0 &&
          usuariosState.favoritos.find((fav) => fav == producto._id)
      );
      if (filtros.favoritos.length === 0) {
        setTextoVacio("No tenés productos favoritos");
      }
    } else if (filtros.favoritos.includes("noFavoritos")) {
      productosFiltrados = productosFiltrados.filter(
        (producto) =>
          !usuariosState ||
          !usuariosState.favoritos.find((fav) => fav === producto._id)
      );
    }

    if (filtros.descuento.includes("descuento")) {
      productosFiltrados = productosFiltrados.filter((producto) =>
        filtros.descuento.includes("descuento")
          ? producto.descuento === true
          : producto.descuento === false
      );
    } else if (filtros.descuento.includes("noDescuento")) {
      productosFiltrados = productosFiltrados.filter(
        (producto) => !producto.descuento
      );
    }

    return productosFiltrados;
  };

  const productosFiltrados = filtrarProductos();

  const totalPaginas = Math.ceil(
    productosFiltrados.length / productosPorPagina
  );

  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosPaginaActual = productosFiltrados.slice(
    indicePrimerProducto,
    indiceUltimoProducto
  );

  return (
    <>
      <div className="menuConteiner"></div>
      <section
        className="menu-contenedor"
        id="productos"
        style={{ backgroundImage: "./src/complementos/imagenes/imgMenu.jpeg" }}
      >
        <Container className="menu-contenedor-body">
          <h2 className="text-white text-center menu-titulo mb-5">Menu</h2>
          <div className="d-flex flex-column flex-md-row flex-lg-row justify-content-between align-items-center">
            <p className="titulo text-center text-lg-start mb-2 mb-md-0">
              {titulo}
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
              productosFiltrados.length === 0 && "mt-0"
            }`}
          >
            <div
              className="row gap-5 contenedor_menu"
              style={{
                justifyContent:
                  window.innerWidth < 500
                    ? "center"
                    : productosFiltrados.length < 3 ||
                      productosPaginaActual.length < 3
                    ? "center"
                    : "space-between",
              }}
            >
              {spinner ? (
                <div
                  className="d-flex justify-content-center"
                  style={{ paddingBottom: "8rem" }}
                >
                  <ClipLoader color="#ffffff" loading={spinner} size={35} />
                </div>
              ) : productosFiltrados.length > 0 ? (
                <TarjetaProducto
                  platosFiltrados={productosFiltrados}
                  productosPaginaActual={productosPaginaActual}
                  productoSinStock={productoSinStock}
                />
              ) : (
                <p className="text-center py-4">{textoVacio}</p>
              )}
            </div>
            {!spinner && (
              <div
                className={`${
                  productosFiltrados.length > 0 ? "d-flex" : "d-none"
                } justify-content-center align-items-center pb-5`}
              >
                <Paginacion
                  totalPaginas={totalPaginas}
                  paginaActual={paginaActual}
                  setPaginaActual={setPaginaActual}
                />
              </div>
            )}
            <ContenedorFiltros
              mostrarFiltro={mostrarFiltro}
              setMostrarFiltro={setMostrarFiltro}
              filtros={filtros}
              setFiltros={setFiltros}
              precioMinimo={precioMinimo}
              precioMaximo={precioMaximo}
              setPaginaActual={setPaginaActual}
              actualizarTitulo={actualizarTitulo}
              setBusqueda={setBusqueda}
            />
          </section>
        </Container>
      </section>
    </>
  );
};

export default Menu;
