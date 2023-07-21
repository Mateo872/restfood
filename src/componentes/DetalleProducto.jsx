import { Container, Card, Row, Col } from "react-bootstrap";
import Footer from "./comunes/Footer";
import { GoBookmark } from "react-icons/go";
import { RiTruckLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {obtenerPlato} from "./ayudas/consultas";

const DetalleProducto = () => {
  const { id } = useParams();
  const [plato, setPlato] = useState([]);

  useEffect(()=>{
    obtenerPlato(id).then((respuesta)=>{
      setPlato(respuesta);
    });
  },[])
  return (
    <>
      <Container className="my-5 mainDetalle">
        <Row>
          <h5 className="text-secondary">{plato.stock}</h5>
          <div className="iconFav">
            <GoBookmark className="display-1 text-light"></GoBookmark>
          </div>

          <Col md={6}>
            <Card.Img variant="top" src={plato.imagen} />
          </Col>
          <Col md={6}>
            <article className="mb-5">
              <h2>{plato.nombre}</h2>
              <h3 className="fw-bold">{plato.precio}</h3>
              <hr />
              <p>
              {plato.descripcion}
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
