import { Card } from "react-bootstrap";
import { BsPlusCircleFill, BsFillHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Producto, UsuariosState } from "../types/types";

interface Props {
  platosFiltrados: Producto[];
  productosPaginaActual: Producto[];
  productoSinStock: Producto[];
}

const TarjetaProducto = ({
  platosFiltrados,
  productosPaginaActual,
  productoSinStock,
}: Props) => {
  const usuarioState = useSelector(
    (state: UsuariosState) => state.usuarios.usuario
  );

  return (
    <>
      {platosFiltrados
        ? productosPaginaActual.map((producto) => (
            <Card key={producto._id} className="card-body my-3 mt-5 mb-5">
              <Card.Img
                variant="top"
                loading="lazy"
                src={producto.imagen}
                className="img-tarjeta-producto"
                style={{ border: "6px solid #c7a17a" }}
              />
              <Card.Body className="body-tarjeta position-relative">
                <div
                  className={`contenedor_favoritos ${
                    usuarioState.nombre.length > 0 &&
                    usuarioState.favoritos.length > 0 &&
                    usuarioState?.favoritos?.find((fav) => fav === producto._id)
                      ? "d-flex"
                      : "d-none"
                  } justify-content-center align-items-center position-absolute`}
                >
                  <BsFillHeartFill className="svg_favorito" />
                </div>
                <Card.Title className="nombre_producto" title={producto.nombre}>
                  {producto.nombre}
                </Card.Title>
                <Card.Text className="fs-5 my-4">
                  Stock:{" "}
                  <span className="fw-light producto_stock">
                    {" "}
                    {producto.stock || 0}
                  </span>
                </Card.Text>
                <div
                  className={`d-flex mt-5 ${
                    productoSinStock.find((prod) => prod._id === producto._id)
                      ? "justify-content-center"
                      : "justify-content-between"
                  } align-items-center`}
                >
                  <Card.Text
                    className={`${
                      productoSinStock.find((prod) => prod._id === producto._id)
                        ? "d-none"
                        : "d-block"
                    } fs-5 my-5`}
                  >
                    {" "}
                    $ {producto.precio}
                  </Card.Text>
                  <Link
                    className={`${
                      productoSinStock.find((prod) => prod._id === producto._id)
                        ? "d-none"
                        : "d-block"
                    }`}
                    to={`/producto/detalle/${producto._id}`}
                  >
                    <BsPlusCircleFill fontSize={40} color="#fff" />
                  </Link>
                  {productoSinStock.find(
                    (prod) => prod._id === producto._id
                  ) && (
                    <p
                      className="text-danger mb-0"
                      style={{ marginTop: "3rem" }}
                    >
                      Sin stock
                    </p>
                  )}
                </div>
              </Card.Body>
            </Card>
          ))
        : ""}
    </>
  );
};

export default TarjetaProducto;
