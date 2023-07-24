import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import fondo from "../complementos/imagenes/366291.jpg";
import { useLocation } from "react-router";
import { iniciarSesion, registro } from "./ayudas/consultas";
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
          if (respuesta.rol === "Administrador") {
            Swal.fire(
              "Bienvenido",
              "Has iniciado sesión correctamente como administrador",
              "success"
            ).then((res) => {
              if (res.isConfirmed) {
                navegacion("/administrador");
              }
            });
          } else {
            Swal.fire(
              "Bienvenido",
              "Has iniciado sesión correctamente",
              "success"
            ).then((res) => {
              if (res.isConfirmed) {
                navegacion("/");
              }
            });
          }
        } else {
          Swal.fire("Error", "Email o contraseña incorrecta", "error");
        }
      });
    } else {
      if (rutaActual === "/usuario/registrar") {
        const nuevoUsuario = {
          imagen: usuarioRegistrado.imagen,
          nombre: usuarioRegistrado.nombre,
          email: usuarioRegistrado.email,
          contrasenia: usuarioRegistrado.contrasenia,
          rol: {
            nombre: "usuario",
          },
          carrito: [],
          pedidos: [],
          favoritos: [],
        };
        registro(nuevoUsuario).then((respuesta) => {
          if (respuesta.status === 201) {
            Swal.fire(
              "Usuario creado",
              `El usuario ${nuevoUsuario.nombre} fue creado con éxito!`,
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
    <section className="contenedor_IniciarRegistro">
      <h1
        className="text-center text-white display-4"
        style={{ fontFamily: "Reenie Beanie, cursive" }}
      >
        {rutaActual === "/usuario/iniciar" ? "Inicio" : "Registro"}
      </h1>
      <Form className="formCrearEditar" onSubmit={handleSubmit(manejoEnvio)}>
        <Form.Group className="mb-3 ">
          <label className="text-white fs-5 mb-1">Nombre</label>
          <div className="text-center">
            <input
              type="text"
              placeholder="Nombre de Usuario"
              className="input_CrearEditarpd"
              {...register("nombre", {
                required: "El nombre de usuario es obligatorio",
                minLength: {
                  value: 2,
                  message: "La cantidad minima de caracteres es de 2 digitos",
                },
                maxLength: {
                  value: 60,
                  message: "La cantidad maxima  de caracteres es de 60 digitos",
                },
              })}
            />
          </div>
          <Form.Text className="text-danger">
            {errors.nombre?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3 ">
          <label className="text-white fs-5 mb-1">Email</label>
          <div className="text-center">
            <input
              type="text"
              placeholder="E-mail"
              className="input_CrearEditarpd"
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'El Email debe contener "@" y terminar en: ".com"',
                },
              })}
            />
          </div>
          <Form.Text className="text-danger">{errors.email?.message}</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <label className="text-white fs-5 mb-1">Imagen</label>
          <div className="text-center">
            <input
              type="text"
              placeholder="Imagen de Usuario"
              className="input_CrearEditarpd"
              {...register("imagen", {
                required: "La imagen es obligatoria",
              })}
            />
          </div>
          <Form.Text className="text-danger">
            {errors.imagen?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <label className="text-white fs-5 mb-1">Contraseña</label>
          <div className="text-center">
            <input
              type="password"
              placeholder="Ej:RollingCode1"
              className="input_CrearEditarpd"
              {...register("contrasenia", {
                required: "La contraseña es obligatoria",
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                  message:
                    "La contraseña debe tener minimo 8 caracteres, al menos una mayúscula una minúscula y un número",
                },
              })}
            />
          </div>
          <Form.Text className="text-danger">
            {errors.contrasenia?.message}
          </Form.Text>
        </Form.Group>
        <Button type="submit" className="btn_AgrProducto">
          {rutaActual === "/usuario/iniciar" ? "Iniciar sesión" : "Registrarme"}
        </Button>
      </Form>
    </section>
  );
};

export default InicioSesion;
