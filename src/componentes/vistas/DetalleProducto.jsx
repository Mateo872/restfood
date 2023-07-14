import { Container, Card, Row, Col } from "react-bootstrap";
import Footer from "../comunes/Footer";
import hamburguesaDoble from "../../complementos/imagenes/Rectangle 110.png";
import { GoBookmark } from "react-icons/go";
import { RiTruckLine } from "react-icons/ri";

const DetalleProducto = () => {
  return (
    <>
      <Container className="my-5 mainDetalle">
        <Row>
          <h5 className="text-secondary">Stock-20 </h5>
          <div className="iconFav">
            <GoBookmark className="display-1 text-light"></GoBookmark>
          </div>

          <Col md={6}>
            <Card.Img variant="top" src={hamburguesaDoble} />
          </Col>
          <Col md={6}>
            <article className="mb-5">
              <h2>HAMBURGUESA DOBLE</h2>
              <h3 className="fw-bold">$1000</h3>
              <hr />
              <p>
                Una deliciosa creación culinaria compuesta por dos jugosas y
                sabrosas hamburguesas de carne, apiladas una encima de la otra,
                y separadas por capas de queso fundido. Entre los panes suaves y
                ligeramente tostados se encuentran también una variedad de
                aderezos y condimentos, como lechuga crujiente, tomate fresco,
                cebolla, pepinillos y una irresistible salsa.
              </p>
              <hr />
              <h2>Tamaño</h2>
              <div className="row">
                <aside className="col-sm-4 col-md-3 mb-3">
                  <button className="btn_DP ">Chico</button>
                </aside>
                <aside className="col-sm-4 col-md-3 mb-3">
                  <button className="btn_DP ">Mediano</button>
                </aside>
                <aside className="col-sm-4 col-md-3 mb-3">
                  {" "}
                  <button className="btn_DP">Grande</button>
                </aside>
              </div>

              <hr />
              <h2>Cantidad</h2>
              <input
                type="text"
                disabled
                className="input_CantidadDP text-center"
                placeholder="0"
              />
              <hr />
              <h2>
                <RiTruckLine className="fs-1" /> Medios de envíos
              </h2>
              <input
                type="text"
                placeholder="Tu código postal"
                className="me-3 input_CantidadDP mb-3"
              />
              <button className="btn_CalcularDP">Calcular</button>
            </article>
            <div className="text-start">
              <button type="submit" className="btn_AgrCarritoDP">
                Agregar al carrito
              </button>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer></Footer>
    </>
  );
};

export default DetalleProducto;
