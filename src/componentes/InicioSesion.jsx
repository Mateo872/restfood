import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import fondo from "../complementos/imagenes/366291.jpg";

const InicioSesion = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (usuarioRegistrado) => {};

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${fondo})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Container className="d-flex align-items-center justify-content-center vh-100">
        <Row className="w-100">
          <Col md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
            <h1
              className="text-center text-white display-4"
              style={{ fontFamily: "Reenie Beanie, cursive" }}
            >
              Registro
            </h1>
            <Form className="form" onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="form-group pt-3">
                <Form.Label className="text-white" htmlFor="nombre">
                  Nombre de usuario:
                </Form.Label>
                <Form.Control
                  type="text"
                  id="nombre"
                  placeholder="Ingrese un nombre de usuario"
                  {...register("nombre", {
                    required: "El nombre de usuario es obligatorio",
                  })}
                />
                <Form.Text className="text-danger">
                  {errors.nombre?.message}
                </Form.Text>
              </Form.Group>
              <Form.Group className="form-group pt-3">
                <Form.Label className="text-white" htmlFor="email">
                  Email:
                </Form.Label>
                <Form.Control
                  type="email"
                  id="email"
                  placeholder="Ingrese un email"
                  {...register("email", {
                    required: "El email es obligatorio",
                  })}
                />
                <Form.Text className="text-danger">
                  {errors.email?.message}
                </Form.Text>
              </Form.Group>
              <Form.Group className="form-group pt-3">
                <Form.Label className="text-white" htmlFor="imagen">
                  Imagen:
                </Form.Label>
                <Form.Control
                  type="text"
                  id="imagen"
                  placeholder="Inserte una imagen"
                  {...register("imagen", {
                    required: "La imagen es obligatoria",
                  })}
                />
                <Form.Text className="text-danger">
                  {errors.imagen?.message}
                </Form.Text>
              </Form.Group>
              <Form.Group className="form-group">
                <Form.Label className="pt-3 text-white" htmlFor="contraseña">
                  Contraseña:
                </Form.Label>
                <Form.Control
                  type="contraseña"
                  id="contraseña"
                  placeholder="Ingrese su contraseña"
                  {...register("contraseña", {
                    required: "La contraseña es obligatoria",
                  })}
                />
                <Form.Text className="text-danger">
                  {errors.contraseña?.message}
                </Form.Text>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="btn btn-primary  mt-3 text-center w-100"
                style={{ backgroundColor: "#C7A17A", borderColor: "#C7A17A" }}
              >
                Registrarme
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default InicioSesion;
