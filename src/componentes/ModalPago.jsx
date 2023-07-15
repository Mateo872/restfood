import { useState } from "react";
import { BsCheck, BsChevronRight, BsHandbag } from "react-icons/bs";
import ClipLoader from "react-spinners/ClipLoader";

const ModalPago = () => {
  const [mostrarDire, setMostrarDire] = useState(false);
  const [mostrarConfirmarPago, setMostrarConfirmarPago] = useState(false);
  const [pago, setPago] = useState(false);
  const [mostrarSpinner, setMostrarSpinner] = useState(false);

  const spinner = () => {
    setMostrarSpinner(true);
    setTimeout(() => {
      setMostrarSpinner(false);
    }, 1000);
  };

  return (
    <div className="modal_pago">
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
                  required
                />
                <div className="paso_circulo d-flex justify-content-center align-items-center">
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
                  required
                />
                <div className="paso_circulo d-flex justify-content-center align-items-center">
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
                    required
                  />
                  <div className="paso_circulo d-flex justify-content-center align-items-center">
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
                    required
                  />
                  <div className="paso_circulo d-flex justify-content-center align-items-center">
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
                  required
                />
                <div className="paso_circulo d-flex justify-content-center align-items-center">
                  <BsCheck className="check" />
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                spinner(), setMostrarDire(!mostrarDire);
              }}
            >
              CONTINUAR
            </button>
          </form>
          <form
            className={`${
              mostrarDire && !mostrarConfirmarPago ? "d-block" : "d-none"
            }`}
          >
            <div className="form-group">
              <label htmlFor="direccion">Calle y número</label>
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  id="direccion"
                  placeholder="San Juan 295"
                  required
                />
                <div className="paso_circulo d-flex justify-content-center align-items-center">
                  <BsCheck className="check" />
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                spinner(), setMostrarConfirmarPago(!mostrarConfirmarPago);
              }}
            >
              CONTINUAR
            </button>
          </form>
          <form
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
              className={`${pago ? "mt-4" : "mt-3"}`}
              onClick={() => {
                setPago(!pago), spinner();
              }}
            >
              {pago ? "LISTO" : "CONFIRMAR COMPRA"}
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
