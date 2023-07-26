import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { BsPlusCircleFill, BsFillHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { obtenerUsuario } from "./ayudas/consultas";

const TarjetaProducto = ({ platosFiltrados, productosPaginaActual }) => {
  const usuario = JSON.parse(sessionStorage.getItem("usuario")) || null;
  const [usuarioID, setUsuarioID] = useState(null);

  useEffect(() => {
    if (usuario && usuario.id) {
      obtenerUsuario(usuario.id).then((res) => {
        setUsuarioID(res);
      });
    }
  }, []);

  return (
    <>
      {platosFiltrados
        ? productosPaginaActual.map((producto) => (
            <Card key={producto.id} className="card-body my-3 mt-5 mb-5">
              <Card.Img
                variant="top"
                src={producto.imagen}
                className="img-tarjeta-producto"
                style={{ border: "6px solid #c7a17a" }}
              />
              <Card.Body className="body-tarjeta position-relative">
                <div
                  className={`contenedor_favoritos ${
                    usuarioID &&
                    usuarioID.favoritos.find((fav) => fav === producto.id)
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
                  <span className="fw-light text-secondary">
                    {" "}
                    {producto.stock}
                  </span>
                </Card.Text>
                <div className="d-flex mt-5 justify-content-between align-items-center">
                  <Card.Text className="fs-5 my-5">
                    {" "}
                    $ {producto.precio}
                  </Card.Text>
                  <Link to={`/producto/detalle/${producto.id}`}>
                    <BsPlusCircleFill fontSize={40} color="#fff" />
                  </Link>
                </div>
              </Card.Body>
            </Card>
          ))
        : ""}
    </>
  );
};

export default TarjetaProducto;
