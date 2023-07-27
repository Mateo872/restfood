import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import {
  editarUsuario,
  iniciarSesion,
  obtenerUsuario,
  registro,
  verificarEmailExistente,
} from "./ayudas/consultas";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const InicioSesion = ({ setUsuarioLogeado, usuarioLogueado }) => {
  const [usuarioID, setUsuarioID] = useState(null);
  const navegacion = useNavigate();
  const ubicacion = useLocation();
  const [editar, setEditar] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm();

  useEffect(() => {
    if (usuarioLogueado && usuarioLogueado._id) {
      obtenerUsuario(usuarioLogueado._id).then((res) => {
        setUsuarioID(res);
      });
    }
  }, [usuarioID]);

  useEffect(() => {
    if (ubicacion.pathname === "/usuario/iniciar" && usuarioID && !editar) {
      setValue("nombre", usuarioID.nombre);
      setValue("email", usuarioID.email);
      setValue("imagen", usuarioID.imagen);
      setValue("contrasenia", usuarioID.contrasenia);
      setEditar(true);
    } else if (ubicacion.pathname === "/usuario/registrar" && usuarioID) {
      Swal.fire("Error", "Cierre sesión para poder registrarse", "error").then(
        (res) => {
          if (res.isConfirmed) {
            navegacion("/");
          } else {
            navegacion("/");
          }
        }
      );
    }
  }, [usuarioID]);

  const manejoEnvio = async (usuarioRegistrado) => {
    if (
      ubicacion.pathname === "/usuario/iniciar" &&
      usuarioLogueado &&
      editar
    ) {
      setEditar(true);
      const usuarioActualizado = {
        email: getValues("email"),
        contrasenia: getValues("contrasenia"),
        imagen: getValues("imagen"),
        nombre: getValues("nombre"),
        rol: usuarioID.rol,
        carrito: usuarioID.carrito,
        pedidos: usuarioID.pedidos,
        favoritos: usuarioID.favoritos,
        estado: usuarioID.estado,
      };

      Swal.fire(
        "Usuario actualizado",
        "Los datos del usuario se han actualizado correctamente.",
        "success"
      ).then(async (res) => {
        if (res.isConfirmed) {
          await editarUsuario(usuarioActualizado, usuarioID._id);
          navegacion("/");
          sessionStorage.setItem("usuario", JSON.stringify(usuarioID));
          setUsuarioLogeado(usuarioID);
        }
      });
    } else {
      if (
        (ubicacion.pathname === "/usuario/iniciar" && !usuarioID) ||
        editar === false
      ) {
        iniciarSesion(usuarioRegistrado).then((respuesta) => {
          setEditar(false);
          if (respuesta.status === 200) {
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
    }
  };

  return (
    <section className="contenedor_IniciarRegistro">
      {!editar && (
        <h1
          className="text-center text-white"
          style={{ fontFamily: "Reenie Beanie, cursive" }}
        >
          {ubicacion.pathname === "/usuario/iniciar" && !editar
            ? "Inicio"
            : "Registro"}
        </h1>
      )}
      {editar && (
        <h2
          className="text-center text-white mt-lg-5"
          style={{ fontSize: "2rem", fontFamily: "Poppins, sans-serif" }}
        >
          Hola, {usuarioID.nombre}
        </h2>
      )}
      <Form className="formCrearEditar" onSubmit={handleSubmit(manejoEnvio)}>
        {editar && (
          <div
            className="contenedor_imagen-editar mb-3"
            style={{
              backgroundImage: `url(${usuarioID.imagen})`,
            }}
          ></div>
        )}
        {((ubicacion.pathname === "/usuario/iniciar" && usuarioID) ||
          ubicacion.pathname === "/usuario/registrar") && (
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
        {((ubicacion.pathname === "/usuario/iniciar" && usuarioID) ||
          ubicacion.pathname === "/usuario/registrar") && (
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
          {ubicacion.pathname === "/usuario/iniciar" && !editar
            ? "Iniciar sesión"
            : editar
            ? "Editar usuario"
            : "Registrarme"}
        </button>
      </Form>
    </section>
  );
};

export default InicioSesion;
