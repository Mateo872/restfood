import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import {
  iniciarSesion,
  registro,
  verificarEmailExistente,
} from "./ayudas/consultas";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const InicioSesion = ({ setUsuarioLogeado }) => {
  const navegacion = useNavigate();
  const ubicacion = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const manejoEnvio = async (usuarioRegistrado) => {
    if (ubicacion.pathname === "/usuario/iniciar") {
      iniciarSesion(usuarioRegistrado).then((respuesta) => {
        if (respuesta) {
          if (respuesta.rol === "administrador") {
            Swal.fire(
              `Bienvenido, ${respuesta.nombre}`,
              "Has iniciado sesión correctamente como administrador",
              "success"
            ).then((res) => {
              if (res.isConfirmed) {
                navegacion("/administrador");
                sessionStorage.setItem("usuario", JSON.stringify(respuesta));
                setUsuarioLogeado(respuesta);
              }
            });
          } else if (respuesta.estado !== "suspendido") {
            Swal.fire(
              `Bienvenido, ${respuesta.nombre}`,
              "Has iniciado sesión correctamente",
              "success"
            ).then((res) => {
              if (res.isConfirmed) {
                navegacion("/");
                sessionStorage.setItem("usuario", JSON.stringify(respuesta));
                setUsuarioLogeado(respuesta);
              }
            });
          } else {
            Swal.fire(
              `Usuario suspendido`,
              "El usuario se encuentra suspendido",
              "error"
            );
          }
        } else {
          Swal.fire("Error", "Email o contraseña incorrecta", "error");
        }
      });
    } else {
      if (ubicacion.pathname === "/usuario/registrar") {
        const emailExiste = await verificarEmailExistente(
          usuarioRegistrado.email
        );
        if (emailExiste) {
          Swal.fire(
            "Error",
            "El correo electrónico ya está registrado.",
            "error"
          );
          return;
        }
        const nuevoUsuario = {
          imagen: usuarioRegistrado.imagen,
          nombre: usuarioRegistrado.nombre,
          email: usuarioRegistrado.email,
          contrasenia: usuarioRegistrado.contrasenia,
          rol: "usuario",
          carrito: [],
          pedidos: [],
          favoritos: [],
          estado: "activo",
        };
        registro(nuevoUsuario).then((respuesta) => {
          if (respuesta.status === 201) {
            Swal.fire(
              "Usuario creado",
              `El usuario ${nuevoUsuario.nombre} fue creado con éxito!`,
              "success"
            ).then((res) => {
              if (res.isConfirmed) {
                Swal.fire(
                  "Iniciar sesión",
                  `Inicie sesión para continuar`,
                  "info"
                ).then((res) => {
                  if (res.isConfirmed) {
                    navegacion("/usuario/iniciar");
                  }
                });
              }
            });
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
        className="text-center text-white"
        style={{ fontFamily: "Reenie Beanie, cursive" }}
      >
        {ubicacion.pathname === "/usuario/iniciar" ? "Inicio" : "Registro"}
      </h1>
      <Form className="formCrearEditar" onSubmit={handleSubmit(manejoEnvio)}>
        {ubicacion.pathname === "/usuario/registrar" && (
          <Form.Group className="mb-3">
            <label className="text-white mb-1">Nombre</label>
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
            <Form.Text className="text-danger fw-bold">
              {errors.nombre?.message}
            </Form.Text>
          </Form.Group>
        )}

        <Form.Group className="mb-3 ">
          <label className="text-white mb-1">Email</label>
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
          <Form.Text className="text-danger fw-bold">
            {errors.email?.message}
          </Form.Text>
        </Form.Group>
        {ubicacion.pathname === "/usuario/registrar" && (
          <Form.Group className="mb-3">
            <label className="text-white mb-1">Imagen</label>
            <input
              type="text"
              placeholder="Imagen de Usuario"
              className="input_CrearEditarpd"
              {...register("imagen", {
                required: "La imagen es obligatoria",
              })}
            />
            <Form.Text className="text-danger fw-bold">
              {errors.imagen?.message}
            </Form.Text>
          </Form.Group>
        )}

        <Form.Group className="mb-3">
          <label className="text-white mb-1">Contraseña</label>
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
          <Form.Text className="text-danger fw-bold">
            {errors.contrasenia?.message}
          </Form.Text>
        </Form.Group>
        <button type="submit" className="boton_iniciar">
          {ubicacion.pathname === "/usuario/iniciar"
            ? "Iniciar sesión"
            : "Registrarme"}
        </button>
      </Form>
    </section>
  );
};

export default InicioSesion;
