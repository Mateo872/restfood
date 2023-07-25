import { useEffect, useState } from "react";
import { BsCheck, BsChevronRight, BsHandbag, BsXLg } from "react-icons/bs";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import {
  agregarPedidos,
  editarUsuario,
  obtenerUsuario,
} from "./ayudas/consultas";

const ModalPago = ({ setMostrarModal, totalCarrito }) => {
  const [mostrarDire, setMostrarDire] = useState(false);
  const [mostrarConfirmarPago, setMostrarConfirmarPago] = useState(false);
  const [pago, setPago] = useState(false);
  const [mostrarSpinner, setMostrarSpinner] = useState(false);
  const [datos, setDatos] = useState({});
  const [usuarioID, setUsuarioID] = useState(null);
  const usuario = JSON.parse(sessionStorage.getItem("usuario")) || null;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (usuario && usuario.id) {
      obtenerUsuario(usuario.id).then((res) => {
        setUsuarioID(res);
      });
    }
  }, []);

  const validarVencimiento = (valor) => {
    const [mes, anio] = valor.split("/");
    const mesVencimiento = parseInt(mes, 10);
    const anioVencimiento = parseInt(anio, 10);

    const fechaActual = new Date();
    const anioActual = fechaActual.getFullYear();
    const mesActual = fechaActual.getMonth() + 1;

    if (
      anioVencimiento < anioActual ||
      (anioVencimiento === anioActual && mesVencimiento < mesActual)
    ) {
      return "La fecha de vencimiento debe ser mayor al mes y año actuales";
    }

    return true;
  };

  const spinner = () => {
    setMostrarSpinner(true);
    setTimeout(() => {
      setMostrarSpinner(false);
    }, 1000);
  };

  const cerrarModal = () => {
    setTimeout(() => {
      setMostrarModal(false);
    }, 2000);
  };

  const envio = async (data, e) => {
    const boton = e.nativeEvent.submitter.name;

    if (boton === "boton_dire") {
      spinner();
      setMostrarDire(!mostrarDire);
    } else if (boton === "boton_confirmarPago") {
      spinner();
      setMostrarConfirmarPago(!mostrarConfirmarPago);
    } else if (boton === "boton_pago") {
      setPago(!pago);
      spinner();
      cerrarModal();
      agregarPedidos(usuario.id, datos);
    }
  };
  const guardarDatos = (e) => {
    const { name, value } = e.target;
    setDatos({
      ...datos,
      [name]: value,
      total: totalCarrito,
      nombresProductos: usuarioID.carrito.map((prod) => prod.nombre),
      email: usuarioID.email,
      estado: "Pendiente",
      fecha: new Date().toLocaleDateString(),
      envio: usuarioID.carrito.map((prod) => prod.costoEnvio),
    });
  };
  return (
    <div className="modal_pago position-relative">
      <div className="modal_cierre position-absolute">
        <BsXLg
          className={`${pago ? "d-none" : "d-block"}`}
          onClick={() =>
            Swal.fire({
              title: "¿Estás seguro?",
              text: "Perderás el proceso de compra",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Si, salir",
              cancelButtonText: "Cancelar",
            }).then((result) => {
              if (result.isConfirmed) {
                setMostrarModal(false);
              }
            })
          }
        />
      </div>
      {!mostrarSpinner ? (
        <div>
          <div className="modal_pasos d-flex justify-content-center align-items-center gap-1">
            <div
              className="modal_paso d-flex justify-content-center align-items-center gap-1"
              style={{ opacity: mostrarDire ? "1" : ".7" }}
            >
              <div
                className="paso_circulo d-flex justify-content-center align-items-center"
                style={{
                  backgroundColor: mostrarDire ? "#9DFFC1" : "#DDD",
                  color: mostrarDire ? "#3DC882" : "#7B827E",
                }}
              >
                <BsCheck className="check" />
              </div>
              <p className="mb-0">Detalle</p>
            </div>
            <BsChevronRight className="chevron" />
            <div
              className="modal_paso d-flex justify-content-center align-items-center gap-1"
              style={{ opacity: mostrarConfirmarPago ? "1" : ".7" }}
            >
              <div
                className="paso_circulo d-flex justify-content-center align-items-center"
                style={{
                  backgroundColor: mostrarConfirmarPago ? "#9DFFC1" : "#DDD",
                  color: mostrarConfirmarPago ? "#3DC882" : "#7B827E",
                }}
              >
                <BsCheck className="check" />
              </div>
              <p className="mb-0">Dirección</p>
            </div>
            <BsChevronRight className="chevron" />
            <div
              className="modal_paso d-flex justify-content-center align-items-center gap-1"
              style={{ opacity: pago ? "1" : ".7" }}
            >
              <div
                className="paso_circulo d-flex justify-content-center align-items-center"
                style={{
                  backgroundColor: pago ? "#9DFFC1" : "#DDD",
                  color: pago ? "#3DC882" : "#7B827E",
                }}
              >
                <BsCheck className="check" />
              </div>
              <p className="mb-0">Confirmar</p>
            </div>
          </div>
          <h3 className="text-center">
            {!mostrarDire
              ? "Detalle de la compra"
              : pago
              ? "Compra procesada"
              : mostrarConfirmarPago
              ? "Confirma su compra"
              : "Dirección"}
          </h3>
          <h4 className="text-center">
            {!mostrarDire
              ? "Complete su compra proporcionando los detalles de su orden."
              : pago
              ? "Compra realizada con éxito. Muchas gracias!"
              : mostrarConfirmarPago
              ? "Verifica y confirma los detalles de tu orden para completar tu compra."
              : "Verifique su dirección."}
          </h4>
          <form
            onSubmit={handleSubmit(envio)}
            className={`${
              mostrarDire || mostrarConfirmarPago ? "d-none" : "d-block"
            }`}
          >
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="position-relative">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="usuario@gmail.com"
                  minLength="5"
                  maxLength="100"
                  required
                  value={usuario.email}
                  {...register("email", {
                    required: "El email es obligatorio",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                      message:
                        "Por favor, introduce una dirección de correo electrónico válida",
                    },
                    minLength: 5,
                    maxLength: 100,
                  })}
                />
                <div className="text-danger">{errors.email?.message}</div>
                <div
                  className={`paso_circulo ${
                    errors.email ? "d-flex" : "d-none"
                  } justify-content-center align-items-center`}
                  style={{
                    backgroundColor: "#DC3545",
                    color: "#8c010e",
                  }}
                >
                  <BsCheck className="check" />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="tarjeta">Número de tarjeta</label>
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  id="tarjeta"
                  placeholder="1234 1234 1234 1234"
                  minLength="19"
                  maxLength="19"
                  required
                  {...register("tarjeta", {
                    required: "La tarjeta es obligatoria",
                    pattern: {
                      value: /^(\d{4} ){3}\d{4}$|^(\d{4}-){3}\d{4}$|^\d{16}$/,
                      message:
                        "Por favor, introduce un número de tarjeta válido",
                    },
                    minLength: 19,
                    maxLength: 19,
                  })}
                />
                <div className="text-danger">{errors.tarjeta?.message}</div>
                <div
                  className={`paso_circulo ${
                    errors.tarjeta ? "d-flex" : "d-none"
                  } justify-content-center align-items-center`}
                  style={{
                    backgroundColor: "#DC3545",
                    color: "#8c010e",
                  }}
                >
                  <BsCheck className="check" />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between mt-0">
              <div className="form_doble form-group">
                <label htmlFor="vencimiento">Fecha de vencimiento</label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    id="vencimiento"
                    placeholder="12/2026"
                    minLength="7"
                    maxLength="7"
                    required
                    {...register("vencimiento", {
                      required: "La fecha de vencimiento es obligatoria",
                      pattern: {
                        value: /^(0[1-9]|1[0-2])\/(20\d{2}|2[1-9]\d{1})$/,
                        message:
                          "Por favor, introduce una fecha de vencimiento válida (MM/AAAA)",
                      },
                      minLength: 7,
                      maxLength: 7,
                      validate: validarVencimiento,
                    })}
                  />
                  <div className="text-danger">
                    {errors.vencimiento?.message}
                  </div>
                  <div
                    className={`paso_circulo ${
                      errors.vencimiento ? "d-flex" : "d-none"
                    } justify-content-center align-items-center`}
                    style={{
                      backgroundColor: "#DC3545",
                      color: "#8c010e",
                    }}
                  >
                    <BsCheck className="check" />
                  </div>
                </div>
                <p className="mb-0">Mes / Año</p>
              </div>
              <div className="form_doble form-group">
                <label htmlFor="codigoSeguridad">Código de seguridad</label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    id="codigoSeguridad"
                    placeholder="444"
                    minLength="3"
                    maxLength="3"
                    required
                    {...register("seguridad", {
                      required: "El código de seguridad es obligatorio",
                      pattern: {
                        value: /^\d{3}$/,
                        message:
                          "Por favor, introduce un código de seguridad válido (3 dígitos)",
                      },
                      minLength: 3,
                      maxLength: 3,
                    })}
                  />
                  <div className="text-danger">{errors.seguridad?.message}</div>
                  <div
                    className={`paso_circulo ${
                      errors.seguridad ? "d-flex" : "d-none"
                    } justify-content-center align-items-center`}
                    style={{
                      backgroundColor: "#DC3545",
                      color: "#8c010e",
                    }}
                  >
                    <BsCheck className="check" />
                  </div>
                </div>
                <p className="mb-0">Los 3 números del dorso de tu tarjeta</p>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="dniTarjeta">DNI del titular de la tarjeta</label>
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  id="dniTarjeta"
                  placeholder="44021006"
                  minLength="7"
                  maxLength="8"
                  required
                  {...register("dni", {
                    required: "El DNI es obligatorio",
                    pattern: {
                      value: /^[0-9]{7,8}$/,
                      message:
                        "Por favor, introduce un número de DNI válido (7 u 8 dígitos)",
                    },
                    minLength: 7,
                    maxLength: 8,
                  })}
                />
                <div className="text-danger">{errors.dni?.message}</div>
                <div
                  className={`paso_circulo ${
                    errors.dni ? "d-flex" : "d-none"
                  } justify-content-center align-items-center`}
                  style={{
                    backgroundColor: "#DC3545",
                    color: "#8c010e",
                  }}
                >
                  <BsCheck className="check" />
                </div>
              </div>
            </div>
            <button type="submit" name="boton_dire">
              CONTINUAR
            </button>
          </form>
          <form
            onSubmit={handleSubmit(envio)}
            className={`${
              mostrarDire && !mostrarConfirmarPago ? "d-block" : "d-none"
            }`}
          >
            <div className="form-group">
              <label htmlFor="domicilio">Calle y número</label>
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  id="domicilio"
                  name="domicilio"
                  placeholder="San Juan 295"
                  minLength="2"
                  maxLength="100"
                  required
                  // value={direccion.domicilio}
                  onChange={guardarDatos}
                  // {...register("domicilio", {
                  //     required: "El domicilio es obligatorio",
                  //     pattern: {
                  //         value: /^[a-zA-Z\s\d]+$/,
                  //         message:
                  //             "Por favor, introduce una dirección válida",
                  //     },
                  //     minLength: 2,
                  //     maxLength: 100,
                  // })}
                />
                <div className="text-danger">{errors.domicilio?.message}</div>
                <div
                  className={`paso_circulo ${
                    errors.domicilio ? "d-flex" : "d-none"
                  } justify-content-center align-items-center`}
                  style={{
                    backgroundColor: "#DC3545",
                    color: "#8c010e",
                  }}
                >
                  <BsCheck className="check" />
                </div>
              </div>
            </div>
            <button type="submit" name="boton_confirmarPago">
              CONTINUAR
            </button>
          </form>
          <form
            onSubmit={handleSubmit(envio)}
            className={`${
              mostrarConfirmarPago ? "d-block" : "d-none"
            } form_pago`}
          >
            <div className="contenedor_mochila text-center position-relative d-flex justify-content-center">
              <BsHandbag />
              <BsCheck
                className="check_mochila"
                style={{ color: pago ? "#3DC882" : "#7B827E" }}
              />
            </div>
            <div className={`${pago ? "d-none" : "d-block"}`}>
              <hr className="m-0 mt-3" />
              <div className="d-flex justify-content-between">
                <h5>Subtotal</h5>
                <h6>$6000</h6>
              </div>
              <div className="d-flex justify-content-between">
                <h5>Costo de envío</h5>
                <h6>$200</h6>
              </div>
              <div className="d-flex justify-content-between">
                <h5>Total</h5>
                <h6>$6200</h6>
              </div>
              <hr className="m-0" />
            </div>
            <h5
              className={`${
                pago ? "d-none" : "d-block"
              } mt-3 mb-0 text-center texto_retrasos`}
            >
              Actualmente estamos experimentando retrasos en los envíos.
            </h5>
            <button
              type="submit"
              name="boton_pago"
              className={`${pago ? "d-none" : "d-block"}`}
            >
              CONFIRMAR COMPRA
            </button>
          </form>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <ClipLoader color="#fff" />
        </div>
      )}
    </div>
  );
};

export default ModalPago;
