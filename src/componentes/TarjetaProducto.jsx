import { Card } from "react-bootstrap";
import { BsPlusCircleFill } from "react-icons/bs";

const TarjetaProducto = ({ platosFiltrados, productosPaginaActual }) => {
  return (
    <>
      {platosFiltrados
        ? productosPaginaActual.map((producto, index) => (
            <Card key={index} className="card-body my-3 mt-5 mb-5">
              <Card.Img
                variant="top"
                src={producto.imagen}
                className="img-tarjeta-producto"
                style={{ border: "6px solid #c7a17a" }}
              />
              <Card.Body className="body-tarjeta">
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
                  <BsPlusCircleFill fontSize={40} />
                </div>
              </Card.Body>
            </Card>
          ))
        : ""}
    </>
  );
};

export default TarjetaProducto;
