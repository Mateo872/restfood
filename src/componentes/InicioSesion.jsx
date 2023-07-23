import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import fondo from "../complementos/imagenes/366291.jpg";
import { useLocation } from "react-router";
import { iniciarSesion, login } from "./ayudas/consultas";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const InicioSesion = ({ setUsuarioLogeado }) => {
  const navegacion = useNavigate();
  const location = useLocation();
  const rutaActual = location.pathname;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const manejoEnvio = (usuarioRegistrado) => {
    if (rutaActual === "/usuario/iniciar") {
      iniciarSesion(usuarioRegistrado).then((respuesta) => {
        if (respuesta) {
          sessionStorage.setItem("usuario", JSON.stringify(respuesta));
          setUsuarioLogeado(respuesta);

          Swal.fire(
            "Bienvenido",
            "Serás redirigido a la sección de administrador",
            "success"
          ).then((res) => {
            if (res.isConfirmed) {
              navegacion("/administrador");
            }
          });
        } else {
          Swal.fire("Error", "Email o contraseña incorrecta", "error");
        }
      });
    } else {
      if (rutaActual === "/usuario/registrar") {
        login(usuarioRegistrado).then((respuesta) => {
          if (respuesta.status === 201) {
            Swal.fire(
              "Usuario creado",
              `El usuario ${usuarioRegistrado.nombre} fue creado con éxito!`,
              "success"
            );
            navegacion("/usuario/iniciar");
            reset();
          } else {
            Swal.fire(
              "Error",
              `Intente realizar esta operación más tarde.`,
              "error"
            );
          }
        });
        reset();
      }
    }
  };

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
              {rutaActual === "/usuario/iniciar" ? "Inicio" : "Registro"}
            </h1>
            <Form className="form" onSubmit={handleSubmit(manejoEnvio)}>
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
                    minLength: {
                      value: 2,
                      message:
                        "La cantidad minima de caracteres es de 2 digitos",
                    },
                    maxLength: {
                      value: 30,
                      message:
                        "La cantidad maxima de caracteres es de 30 digitos",
                    },
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
                    pattern: {
                      value:
                        /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
                      message:
                        'El Email debe contener "@" y terminar en: ".com"',
                    },
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
                  type="password"
                  id="contrasenia"
                  placeholder="Ingrese su contraseña"
                  {...register("contrasenia", {
                    required: "La contraseña es obligatoria",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                      message:
                        "La contraseña debe tener minimo 8 caracteres, al menos una mayúscula una minúscula y un número",
                    },
                  })}
                />
                <Form.Text className="text-danger">
                  {errors.contrasenia?.message}
                </Form.Text>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="btn btn-primary  mt-3 text-center w-100"
                style={{ backgroundColor: "#C7A17A", borderColor: "#C7A17A" }}
              >
                {rutaActual === "/usuario/iniciar"
                  ? "Iniciar sesión"
                  : "Registrarme"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default InicioSesion;
